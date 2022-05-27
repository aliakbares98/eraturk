import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AbilityModule } from '@casl/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ActionsComponent } from './components/actions/actions.component';
import { AddFooterComponent } from './components/add-footer/add-footer.component';
import { ListToolbarComponent } from './components/list-toolbar/list-toolbar.component';
@NgModule({
  declarations: [
    ListToolbarComponent,
    AddFooterComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    AbilityModule,
    TranslateModule.forChild()
  ],
  exports: [
    ListToolbarComponent,
    AddFooterComponent,
    ActionsComponent
  ]
})
export class ToolbarModule { }
