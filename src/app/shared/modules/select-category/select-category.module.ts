import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TreeModule } from '@circlon/angular-tree-component';
import { ToolbarModule } from 'src/app/shared/modules';
import { SelectCategoryComponent } from './select-category.component';

@NgModule({
  declarations: [
    SelectCategoryComponent],
  imports: [
    CommonModule,
    TreeModule,
    MatButtonModule,
    ToolbarModule,
    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    SelectCategoryComponent
  ]
})
export class SelectCategoryModule { }
