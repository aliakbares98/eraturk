import { TranslateService } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ListDialogComponent } from 'src/app/shared/components/base/list-base/list-dialog/list-dialog.component';
import { CultureDTO } from 'src/app/shared/dto';
import { ComponentsResolver } from 'src/app/shared/interfaces';
import { SearchParams } from 'src/app/shared/models';
import { CultureService } from 'src/app/shared/services/culture.service';
import { CultureAddComponent } from '../culture-add/culture-add.component';
import { CultureEditComponent } from '../culture-edit/culture-edit.component';

@Component({
  selector: 'era-culture-list',
  templateUrl: './culture-list.component.html',
  styleUrls: ['./culture-list.component.scss']
})
export class CultureListComponent extends ListDialogComponent<CultureDTO> implements OnInit, OnDestroy {




  constructor(public cultureService: CultureService, public translateService: TranslateService, public ref: ChangeDetectorRef) {
    super(cultureService);
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
      { prop: 'name', name: new AsyncPipe(this.ref).transform(this.translateService.get('NAME')), headerTemplate: this.filterable },
      { prop: 'actions', name: new AsyncPipe(this.ref).transform(this.translateService.get('ACTION')), cellTemplate: this.actions },

    ]
  }

  getComponentResolvers(): ComponentsResolver {
    return {
      add: () => CultureAddComponent,
      edit: () => CultureEditComponent
    }
  };

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}