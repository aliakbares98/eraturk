import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAvailableRoutingModule } from './not-available-routing.module';
import { NotAvailableComponent } from './not-available.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NotAvailableComponent
  ],
  imports: [
    CommonModule,
    NotAvailableRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule
  ]
})
export class NotAvailableModule { }
