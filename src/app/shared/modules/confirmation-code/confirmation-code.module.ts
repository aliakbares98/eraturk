import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationCodeComponent } from './confirmation-code.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';



@NgModule({
  declarations: [
    ConfirmationCodeComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ],
  exports:[
    ConfirmationCodeComponent
  ]
})
export class ConfirmationCodeModule { }
