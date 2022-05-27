import { contact } from './../../../../shared/data/type-alias.data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { OTP_SCENARIO } from 'src/app/modules/authentication/data/otp.senarios.data';
import { OtpDTO, OtpViewDto } from 'src/app/modules/authentication/dto';
import { OtpService } from 'src/app/modules/authentication/services/otp.service';
import { AddPageComponent } from 'src/app/shared/components/base/add-base/add-page/add-page.component';
import { COMMON_MESSAGES, DATE_FORMAT, FILTER_OPERATION, REGEX, SOCIAL_LIST } from 'src/app/shared/data';
import { GENDER_LIST } from 'src/app/shared/data/gender.data';
import { CommandResponseDTO, LocationDTO } from 'src/app/shared/dto';
import { IndividualPartyDTO } from 'src/app/shared/dto/individual-party.dto';
import { Filter, SearchParams } from 'src/app/shared/models';
import { LocationService } from 'src/app/shared/services';
import { PartyService } from 'src/app/shared/services/party.service';
import { FormUtilities } from 'src/app/shared/utilities';
import { environment } from 'src/environments/environment';
import {
  CONTACT_INFO_TYPE,
  CONTACT_INFO_TYPE_LIST
} from '../../data/contact-info-type.data';

@Component({
  selector: 'era-individual-party-add',
  templateUrl: './individual-party-add.component.html',
  styleUrls: ['./individual-party-add.component.scss']
})
export class IndividualPartyAddComponent extends AddPageComponent<IndividualPartyDTO> implements OnInit, OnDestroy {
  constructor(public partyService: PartyService,
    public dialogRef: MatDialogRef<any>,
    public locationService: LocationService,
    private otpService: OtpService) {
    super(partyService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getNationalities();

    if (!environment.production) {
      this.doSomething();
    }
  }

  doSomething() {
    this.addContactForm();
    this.contacts[0].controls.type.setValue(this.contactInfoType.cellphone);
    this.addValuePartOfContactForm({ value: this.contactInfoType.cellphone } as MatSelectChange, 0);
  }

  getTitleToken(): string {
    return 'MENU.INDIVIDUAL_PARTY';
  }

  contactInfoType = CONTACT_INFO_TYPE;
  contactInfoTypeList = CONTACT_INFO_TYPE_LIST;
  socialsList = SOCIAL_LIST;
  genders = GENDER_LIST;

  nationalityList: LocationDTO[] = [];
  getNationalities(): void {
    this.locationService.getAll<LocationDTO>(this.nationalitiesSearchParam.stringify()).subscribe(result => {
      this.nationalityList = result.items;
      this.feedNationalityOptions(result.items);
    });
  }

  get nationalitiesSearchParam(): SearchParams {
    let params = new SearchParams();
    params.pageSize = 300;
    let filter: Filter = {
      field: 'type.code',
      operator: FILTER_OPERATION.equal,
      value: 'country'
    };

    params.filter = JSON.stringify(filter);

    return params;
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      gender: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      nationalityInput: [null, Validators.required],
      nationality: [null, Validators.required],
      description: [null],
      contacts: this.formBuilder.array([])
    });
  }

  /**
   * Nationality AutoComplete
   */
  nationlitiesOptions: Observable<LocationDTO[]>;
  feedNationalityOptions(list: LocationDTO[]): void {
    this.nationlitiesOptions = FormUtilities.observeOnInput<LocationDTO>(list,
      this.form.controls.nationalityInput,
      this.form.controls.nationality,
      'code',
      'name');
  }

  displayFnNationality(nationality: LocationDTO): string {
    return nationality && nationality.name ? nationality.name : '';
  }

  addContactForm(): void {
    let group = this.formBuilder.group({
      type: [null, Validators.required],
      description: [null]
    });

    (this.form.controls.contacts as FormArray).push(group);
  }

  getContactFormByIndex(index: number): FormGroup {
    return (this.form.controls.contacts as FormArray).at(index) as FormGroup;
  }

  removeContact(index: number): void {
    (this.form.controls.contacts as FormArray).removeAt(index);
  }

  addValuePartOfContactForm(event: MatSelectChange, index: number): void {
    let formControl;

    switch (event.value) {
      case CONTACT_INFO_TYPE.email:
        formControl = new FormControl(null, [Validators.required, Validators.email]);
        break;

      case CONTACT_INFO_TYPE.cellphone:
        formControl = new FormControl(null, [Validators.required, Validators.pattern(REGEX.cellphone)]);
        break;

      case CONTACT_INFO_TYPE.phone:
        formControl = new FormControl(null, [Validators.required, Validators.pattern(REGEX.phone)]);
        break;

      case CONTACT_INFO_TYPE.website:
        formControl = new FormControl(null, [Validators.required, Validators.pattern(REGEX.website)]);
        break;

      case CONTACT_INFO_TYPE.socialId:
        formControl = this.formBuilder.group({
          id: [null, Validators.required],
          code: [null, Validators.required]
        });
        break;

      case CONTACT_INFO_TYPE.physicalAddress:
        formControl = this.formBuilder.group({
          title: [null, Validators.required],
          line1: [null, Validators.required],
          line2: [null, Validators.required],
          postalCode: [null, Validators.required],
          cityInput: [null, Validators.required],
          city: [null, Validators.required],
          coordinate: [null]
        });
        break;

      default:
        break;
    }

    let contact: FormGroup = this.getContactFormByIndex(index);
    if (contact.controls.value) {
      contact.removeControl('value');
    }
    contact.addControl('value', formControl as FormControl);

    if (event.value === CONTACT_INFO_TYPE.physicalAddress) {
      this.getCities(index);
    } else if (event.value === CONTACT_INFO_TYPE.email || event.value === CONTACT_INFO_TYPE.cellphone) {
      let otpFormControl = new FormControl(null, [Validators.required]);
      contact.addControl('otp', otpFormControl);
    }
  }

  get contacts(): FormGroup[] {
    return (this.form.controls.contacts as FormArray).controls as FormGroup[];
  }

  /**
   * City AutoComplete
   */
  citiesOptions: Observable<LocationDTO[]>[] = [];
  cityList: LocationDTO[] = [];
  getCities(index: number): void {
    if (this.cityList.length === 0) {
      this.locationService.getAll<LocationDTO>(this.citiesSearchParams.stringify()).subscribe(result => {
        this.cityList = result.items;
        this.feedCitiesOptions(index);
      });
    } else {
      this.feedCitiesOptions(index);
    }
  }

  get citiesSearchParams(): SearchParams {
    let params = new SearchParams();

    params.pageSize = 100;
    let filter: Filter = {
      field: 'type.code',
      operator: FILTER_OPERATION.equal,
      value: 'city'
    };
    params.filter = JSON.stringify(filter);

    return params;
  }

  feedCitiesOptions(index: number): void {
    let valueFormControl: FormGroup = this.getContactFormByIndex(index).controls.value as FormGroup;
    this.citiesOptions[index] = FormUtilities.observeOnInput<LocationDTO>(this.cityList,
      valueFormControl.controls.cityInput,
      valueFormControl.controls.city,
      'code',
      'name');
  }

  displayFnCity(city: LocationDTO): string {
    return city && city.name ? city.name : '';
  }

  getValue(contact: FormGroup) {
    // this.value =contact.value;
  }

  requestOtpCodeEmail(contactForm: FormGroup) {
    let otpDto: OtpDTO = {
      key: contactForm.controls.value.value,
      scenario: OTP_SCENARIO.confirmEmail,
      captcha: 'S'
    };

    this.otpService.otp(otpDto).subscribe((result: OtpViewDto) => {
      contactForm.controls.otp.setValue(result.otp);
    }, error => {

    })
  }

  save(): void {
    this.loading = true;
    const subResult = this.partyService.createIndividualParty(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.router.navigate(['profile/individualt-party/list']);
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.savingWasNotSuccessful);
    });

    this.subscriptions$.add(subResult);
  }

  prepareModel(): IndividualPartyDTO {
    let formattedDate = moment(this.form.controls.birthDate.value).format(DATE_FORMAT.date);
    this.form.controls.birthDate.setValue(formattedDate);

    delete this.form.value.nationalityInput;

    this.form.value.contacts
      .filter((contact: any) => (contact.value as any)?.cityInput)
      .forEach((contact: any) => {
        delete (contact.value as any).cityInput;
      });

    return this.form.value;
  }

  getListPageAddress(): string {
    return 'profile/individualt-party/list';
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
