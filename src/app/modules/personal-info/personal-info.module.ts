import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PersonalInfoEditComponent } from './components/personal-info-edit/personal-info-edit.component';
import { PersonalInfoComponent } from './components/personal-info.component';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';



@NgModule({
  declarations: [
    PersonalInfoComponent,
    PersonalInfoEditComponent
  ],
  imports: [
    CommonModule,
    PersonalInfoRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    TranslateModule.forChild()


  ]
})
export class PersonalInfoModule { }
