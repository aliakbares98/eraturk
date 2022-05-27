import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { OrganizationPartyAddComponent } from './components/organization-party-add/organization-party-add.component';
import { OrganizationPartyEditComponent } from './components/organization-party-edit/organization-party-edit.component';
import { OrganizationPartyListComponent } from './components/organization-party-list/organization-party-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: OrganizationPartyListComponent,
    data: {
      userAction: PERMISSIONS.ViewParty
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'add',
    component: OrganizationPartyAddComponent,
    data: {
      userAction: PERMISSIONS.CreateOrganizationParty
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'edit/:id',
    component: OrganizationPartyEditComponent,
    data: {
      userAction: PERMISSIONS.UpdateOrganizationParty
    },
    canActivate: [PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationPartyRoutingModule { }
