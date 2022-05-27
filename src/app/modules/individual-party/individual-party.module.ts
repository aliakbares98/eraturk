import { ConfirmationCodeModule } from './../../shared/modules/confirmation-code/confirmation-code.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { IndividualPartyRoutingModule } from './individual-party-routing.module';

// Components
import { IndividualPartyAddComponent } from './components/individual-party-add/individual-party-add.component';
import { IndividualPartyEditComponent } from './components/individual-party-edit/individual-party-edit.component';
import { IndividualPartyListComponent } from './components/individual-party-list/individual-party-list.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';



@NgModule({
  declarations: [IndividualPartyListComponent, IndividualPartyAddComponent, IndividualPartyEditComponent],
  imports: [
    CommonModule,
    IndividualPartyRoutingModule,
    BaseImportsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    ConfirmationCodeModule,
    NgxMatIntlTelInputModule,
    TranslateModule.forChild(),
  ],
  providers: [
    DatePipe,
  ]
})
export class IndividualPartyModule { }
