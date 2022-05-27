import { NgModule } from '@angular/core';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { SystemSettingRoutingModule } from './system-setting-routing.module';

import { SystemSettingListComponent } from './components/system-setting-list/system-setting-list.component';
import { SystemSettingAddComponent } from './components/system-setting-add/system-setting-add.component';
import { SystemSettingEditComponent } from './components/system-setting-edit/system-setting-edit.component';


@NgModule({
  declarations: [
    SystemSettingListComponent,
    SystemSettingAddComponent,
    SystemSettingEditComponent,
  ],
  imports: [
    SystemSettingRoutingModule,
    BaseImportsModule,



  ]
})
export class SystemSettingModule { }
