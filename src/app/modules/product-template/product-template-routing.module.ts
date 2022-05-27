import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { ProductTemplateAddComponent } from './components/product-template-add/product-template-add.component';
import { ProductTemplateEditComponent } from './components/product-template-edit/product-template-edit.component';
import { ProductTemplateListComponent } from './components/product-template-list/product-template-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductTemplateListComponent,
    data: {
      userAction: PERMISSIONS.ViewProductTemplate
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'add',
    component: ProductTemplateAddComponent,
    data: {
      userAction: PERMISSIONS.ViewProductTemplate
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'edit/:id',
    component: ProductTemplateEditComponent,
    data: {
      userAction: PERMISSIONS.ViewProductTemplate
    },
    canActivate: [PermissionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTemplateRoutingModule { }
