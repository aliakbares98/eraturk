import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';



@NgModule({
  declarations: [
    MessagingComponent
  ],
  imports: [
    CommonModule,
    BaseImportsModule,
    MessagingRoutingModule,
    FlexLayoutModule,
    MatSidenavModule
  ]
})
export class MessagingModule { }
