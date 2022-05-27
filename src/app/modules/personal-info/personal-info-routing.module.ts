import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { PERMISSIONS } from 'src/app/shared/data';
import { PersonalInfoEditComponent } from './components/personal-info-edit/personal-info-edit.component';
import { PersonalInfoComponent } from './components/personal-info.component';



const routes: Routes = [
  {
    path: '',
    component: PersonalInfoComponent
  },
  {
    path: 'edit',
    component: PersonalInfoEditComponent,
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
export class PersonalInfoRoutingModule { }
