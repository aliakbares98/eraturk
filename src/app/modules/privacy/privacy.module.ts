import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';



@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    FlexLayoutModule
  ]
})
export class PrivacyModule { }
