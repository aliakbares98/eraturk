import { AsyncPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit, PipeTransform, TemplateRef, ViewChild } from '@angular/core';
import { ThemeService } from 'src/app/shared/client-services/theme.service';
import { ListDialogComponent } from 'src/app/shared/components/base/list-base/list-dialog/list-dialog.component';
import { DocumentTypeDTO, FileLimitation } from 'src/app/shared/dto/document-type.dto';
import { ComponentsResolver } from 'src/app/shared/interfaces';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { DocumentTypeService } from 'src/app/shared/services/document-type.service';
import { DocumentTypeAddComponent } from '../document-type-add/document-type-add.component';
import { DocumentTypeEditComponent } from '../document-type-edit/document-type-edit.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'era-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss']
})
export class DocumentTypeListComponent extends ListDialogComponent<DocumentTypeDTO> implements OnInit, OnDestroy {

  constructor(public documentTypeService: DocumentTypeService,
    private themeService: ThemeService,
    public translateService: TranslateService,
    public ref: ChangeDetectorRef) {
    super(documentTypeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialSearchParams(): void {
    this.searchParams = new SearchParams();
  }

  @ViewChild('filterable') filterable: TemplateRef<any>;

  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[];
  setColumns(): void {
    this.columns = [
      { prop: 'name',name:new AsyncPipe(this.ref).transform(this.translateService.get('NAME')), headerTemplate: this.filterable },
      { prop: 'code',name:new AsyncPipe(this.ref).transform(this.translateService.get('CODE')), headerTemplate: this.filterable },
      { prop: 'fileLimitations', name:new AsyncPipe(this.ref).transform(this.translateService.get('FILELIMITATIONS')), sortable: false, pipe: new FileLimitationTransformer() },
      { prop: 'actions', name:new AsyncPipe(this.ref).transform(this.translateService.get('ACTIONS')), cellTemplate: this.actions },

    ];
  }

  getComponentResolvers(): ComponentsResolver {
    return {
      add: () => DocumentTypeAddComponent,
      edit: () => DocumentTypeEditComponent
    }
  };

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

class FileLimitationTransformer implements PipeTransform {
  transform(limitations: FileLimitation[]): string {
    let html = '';
    limitations.forEach((item: FileLimitation) => {
      html += `<span class='custom-chips'>${item.extension} : ${item.maxSizeInByte / 1_000_000}MB</span>`;
    })
    return html;
  }
}