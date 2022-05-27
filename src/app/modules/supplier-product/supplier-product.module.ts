import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploaderModule } from 'src/app/shared/modules';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { InputTypesModule } from 'src/app/shared/modules/input-types/input-types.module';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { SupplierProductAddComponent } from './components/supplier-product-add/supplier-product-add.component';
import { SupplierProductEditComponent } from './components/supplier-product-edit/supplier-product-edit.component';
import { SupplierProductListComponent } from './components/supplier-product-list/supplier-product-list.component';
import { SupplierProductRoutingModule } from './supplier-product-routing.module';


@NgModule({
  declarations: [
    SupplierProductListComponent,
    SupplierProductAddComponent,
    SupplierProductEditComponent,
  ],
  imports: [
    CommonModule,
    SupplierProductRoutingModule,
    BaseImportsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    InputTypesModule,
    LoadingModule,
    FileUploaderModule
  ],
  providers: [

  ]
})
export class SupplierProductModule { }
