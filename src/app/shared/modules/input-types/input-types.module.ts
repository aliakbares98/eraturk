import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { InputTypesMaterialComponent } from './components/input-types-material/input-types-material.component';
import { InputTypesComponent } from './components/input-types/input-types.component';

@NgModule({
  declarations: [
    InputTypesComponent,
    InputTypesMaterialComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    ValidationMessageModule,
    FlexLayoutModule,
    MatSlideToggleModule
  ],
  exports: [
    InputTypesComponent
  ]
})
export class InputTypesModule { }
