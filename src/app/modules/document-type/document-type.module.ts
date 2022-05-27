import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { DocumentTypeAddComponent } from './components/document-type-add/document-type-add.component';
import { DocumentTypeEditComponent } from './components/document-type-edit/document-type-edit.component';
import { DocumentTypeListComponent } from './components/document-type-list/document-type-list.component';
import { DocumentTypeRoutingModule } from './document-type-routing.module';

@NgModule({
  declarations: [
    DocumentTypeListComponent,
    DocumentTypeAddComponent,
    DocumentTypeEditComponent],
  imports: [
    CommonModule,
    DocumentTypeRoutingModule,
    BaseImportsModule,
  ]
})
export class DocumentTypeModule { }
