import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

const routes = [
  {
    path: '',
    component: AboutUsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AboutUsRoutingModule { }
