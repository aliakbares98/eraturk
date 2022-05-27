import { NgModule } from '@angular/core';
import { PERMISSIONS } from 'src/app/shared/data';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { DocumentTypeListComponent } from './components/document-type-list/document-type-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: DocumentTypeListComponent,
    data: {
      userAction: PERMISSIONS.ViewDocumentType
    },
    canActivate: [
      PermissionGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeRoutingModule { }
