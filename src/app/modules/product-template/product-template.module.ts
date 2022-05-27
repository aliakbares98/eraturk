import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { InputTypesModule } from 'src/app/shared/modules/input-types/input-types.module';
import { SelectCategoryModule } from '../../shared/modules/select-category/select-category.module';
import { ProductTemplateAddComponent } from './components/product-template-add/product-template-add.component';
import { ProductTemplateEditComponent } from './components/product-template-edit/product-template-edit.component';
import { ProductTemplateListComponent } from './components/product-template-list/product-template-list.component';
import { ProductTemplateRoutingModule } from './product-template-routing.module';

@NgModule({
  declarations: [
    ProductTemplateListComponent,
    ProductTemplateAddComponent,
    ProductTemplateEditComponent],
  imports: [
    CommonModule,
    ProductTemplateRoutingModule,
    BaseImportsModule,
    MatAutocompleteModule,
    SelectCategoryModule,
    MatExpansionModule,
    InputTypesModule
  ]
})
export class ProductTemplateModule { }
