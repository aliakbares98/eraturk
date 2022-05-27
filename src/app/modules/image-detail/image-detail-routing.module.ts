import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailComponent } from './image-detail.component';

const routes: Routes = [
  {
    path:'',
    component:ImageDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageDetailRoutingModule { }
