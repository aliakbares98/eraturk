import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductListComponent,
    data: {
      userAction: PERMISSIONS.ViewProduct
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'add',
    component: ProductAddComponent,
    data: {
      userAction: PERMISSIONS.ViewProduct
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    data: {
      userAction: PERMISSIONS.ViewProduct
    },
    canActivate: [PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
