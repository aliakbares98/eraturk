import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';


const routes = [
  {
    path: '',
    component: ContactUsComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ContactUsRoutingModule { }
