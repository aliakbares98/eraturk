import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoDetailsComponent } from './video-details.component';

const routes = [
  {
    path: '',
    component: VideoDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoDetailsRoutingModule { }
