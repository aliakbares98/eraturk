import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductCategoryListComponent,
    data: {
      userAction: PERMISSIONS.ViewProductCategory
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
export class ProductCategoryRoutingModule { }
