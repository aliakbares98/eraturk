import { ConfirmationCodeModule } from './../../shared/modules/confirmation-code/confirmation-code.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { OrganizationPartyAddComponent } from './components/organization-party-add/organization-party-add.component';
import { OrganizationPartyEditComponent } from './components/organization-party-edit/organization-party-edit.component';
import { OrganizationPartyListComponent } from './components/organization-party-list/organization-party-list.component';
import { OrganizationPartyRoutingModule } from './organization-party-routing.module';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';


@NgModule({
  declarations: [OrganizationPartyListComponent, OrganizationPartyAddComponent, OrganizationPartyEditComponent],
  imports: [
    CommonModule,
    BaseImportsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    OrganizationPartyRoutingModule,
    ConfirmationCodeModule,
    NgxMatIntlTelInputModule,
    TranslateModule.forChild()
  ],
  providers: [
    DatePipe
  ]
})
export class OrganizationPartyModule { }
