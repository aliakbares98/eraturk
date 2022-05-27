import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { CultureListComponent } from './components/culture-list/culture-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: CultureListComponent,
    data: {
      userAction: PERMISSIONS.ViewCulture
    },
    canActivate: [PermissionGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultureRoutingModule { }
