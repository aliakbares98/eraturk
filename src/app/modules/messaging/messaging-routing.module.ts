import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagingComponent } from './messaging.component';

const routes = [
  {
    path: '',
    component: MessagingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingRoutingModule { }
