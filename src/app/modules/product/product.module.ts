import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { InputTypesModule } from 'src/app/shared/modules/input-types/input-types.module';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    BaseImportsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    InputTypesModule
  ],
  providers: [

  ]
})
export class ProductModule { }
