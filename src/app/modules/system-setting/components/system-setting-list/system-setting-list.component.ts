import { AsyncPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FileLimitation } from './../../../../shared/dto/document-type.dto';
import { SystemSettingEditComponent } from './../system-setting-edit/system-setting-edit.component';
import { SystemSettingAddComponent } from './../system-setting-add/system-setting-add.component';
import { SystemSettingService } from './../../../../shared/services/system-setting.service';
import { Component, OnInit, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ComponentsResolver } from 'src/app/shared/interfaces';
import { ViewChild } from '@angular/core';
import { SearchParams } from 'src/app/shared/models';
import { SystemSettingDTO } from 'src/app/shared/dto/system-setting.dto';
import { ListDialogComponent } from 'src/app/shared/components/base/list-base/list-dialog/list-dialog.component';

@Component({
  selector: 'era-system-setting',
  templateUrl: './system-setting-list.component.html',
  styleUrls: ['./system-setting-list.component.scss']
})
export class SystemSettingListComponent extends ListDialogComponent<SystemSettingDTO> implements OnInit, OnDestroy {

  constructor(public systemSettingSerive: SystemSettingService, public translateSerice: TranslateService,public ref:ChangeDetectorRef) {
    super(systemSettingSerive)
  }
  ngOnInit() {
    super.ngOnInit();
  }

  initialSearchParams(): void {
    this.searchParams = new SearchParams();
  }

  @ViewChild('filtrable') filtrable: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[];
  setColumns(): void {
    this.columns = [
      { prop: 'name', name:new AsyncPipe(this.ref).transform(this.translateSerice.get('NAME')), headerTemplate: this.filtrable, sortable: true },
      { prop: 'value',name:new AsyncPipe(this.ref).transform(this.translateSerice.get('VALUE')), headerTemplate: this.filtrable, sortable: true },
      { prop: 'actions', name:new AsyncPipe(this.ref).transform(this.translateSerice.get('ACTIONS')), cellTemplate: this.actions }
    ]
  }
  getComponentResolvers(): ComponentsResolver {
    return {
      add: () => SystemSettingAddComponent,
      edit: () => SystemSettingEditComponent,
    }
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}


