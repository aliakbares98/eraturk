import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { SupplierProductAddComponent } from './components/supplier-product-add/supplier-product-add.component';
import { SupplierProductEditComponent } from './components/supplier-product-edit/supplier-product-edit.component';
import { SupplierProductListComponent } from './components/supplier-product-list/supplier-product-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: SupplierProductListComponent,
    data: {
      userAction: PERMISSIONS.ViewProduct
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'add',
    component: SupplierProductAddComponent,
    data: {
      userAction: PERMISSIONS.ViewProduct
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'edit/:id',
    component: SupplierProductEditComponent,
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
export class SupplierProductRoutingModule { }
