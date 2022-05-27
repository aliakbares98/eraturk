import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';

const routes = [{
  path: '',
component: FaqComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
