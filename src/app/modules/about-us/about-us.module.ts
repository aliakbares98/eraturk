import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { CommentingModule } from 'src/app/shared/modules/commenting/commenting.module';



@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    AboutUsRoutingModule,
    CommonModule,
    FlexLayoutModule,
    CommentingModule
  ]
})
export class AboutUsModule { }
