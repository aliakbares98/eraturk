import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { IndividualPartyAddComponent } from './components/individual-party-add/individual-party-add.component';
import { IndividualPartyEditComponent } from './components/individual-party-edit/individual-party-edit.component';
import { IndividualPartyListComponent } from './components/individual-party-list/individual-party-list.component';

const routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: IndividualPartyListComponent,
    data: {
      userAction: PERMISSIONS.ViewParty
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'add',
    component: IndividualPartyAddComponent,
    data: {
      userAction: PERMISSIONS.CreateIndividualParty
    },
    canActivate: [PermissionGuard]
  },
  {
    path: 'edit/:id',
    component: IndividualPartyEditComponent,
    data: {
      userAction: PERMISSIONS.UpdateIndividualParty
    },
    canActivate: [PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualPartyRoutingModule { }
