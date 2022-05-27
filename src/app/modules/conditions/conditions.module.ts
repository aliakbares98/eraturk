import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionsRoutingModule } from './conditions-routing.module';
import { ConditionsComponent } from './conditions.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ConditionsComponent],
  imports: [
    CommonModule,
    ConditionsRoutingModule,
    FlexLayoutModule
  ]
})
export class ConditionsModule { }
