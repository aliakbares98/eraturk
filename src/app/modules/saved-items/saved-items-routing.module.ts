import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { SavedItemsComponent } from './saved-items.component';

const routes: Routes = [
  {
    path: '',
    component: SavedItemsComponent,
    data: {
    userAction: PERMISSIONS.AllowedTemporarily
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
export class SaveRoutingModule { }
