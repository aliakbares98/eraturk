import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { cloneDeep as _cloneDeep } from 'lodash-es';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { OTP_SCENARIO } from 'src/app/modules/authentication/data/otp.senarios.data';
import { OtpDTO, OtpViewDto } from 'src/app/modules/authentication/dto';
import { OtpService } from 'src/app/modules/authentication/services/otp.service';
import { EditDialogComponent } from 'src/app/shared/components/base/edit-base/edit-dialog/edit-dialog.component';
import { COMMON_MESSAGES, FILTER_OPERATION, REGEX, SOCIAL_LIST } from 'src/app/shared/data';
import { DATE_FORMAT } from 'src/app/shared/data/date-format.data';
import { GENDER_LIST } from 'src/app/shared/data/gender.data';
import { CommandResponseDTO, LocationDTO } from 'src/app/shared/dto';
import { IndividualPartyDTO } from 'src/app/shared/dto/individual-party.dto';
import { OrganizationPartyDTO } from 'src/app/shared/dto/organization-party.dto';
import { Filter, SearchParams } from 'src/app/shared/models';
import { LocationService } from 'src/app/shared/services';
import { PartyService } from 'src/app/shared/services/party.service';
import { FormUtilities } from 'src/app/shared/utilities';
import { CONTACT_INFO_TYPE, CONTACT_INFO_TYPE_LIST } from '../../data/contact-info-type.data';

@Component({
  selector: 'era-organization-party-edit',
  templateUrl: './organization-party-edit.component.html',
  styleUrls: ['./organization-party-edit.component.scss']
})
export class OrganizationPartyEditComponent extends EditDialogComponent<OrganizationPartyDTO> implements OnInit, OnDestroy {

  constructor(public partyService: PartyService,
    public dialogRef: MatDialogRef<OrganizationPartyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndividualPartyDTO,
    public locationService: LocationService,
    private otpService: OtpService) {
    super(partyService, dialogRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getNationalities();
  }

  getTitleToken(): string {
    return 'MENU.ORGANIZATION_PARTY';
  }

  contactInfoType = CONTACT_INFO_TYPE;
  contactInfoTypeList = CONTACT_INFO_TYPE_LIST;
  socialsList = SOCIAL_LIST;
  genders = GENDER_LIST;

  getNationalities(): void {
    this.locationService.getAll<LocationDTO>(this.nationalitiesSearchParam.stringify()).subscribe(result => {
      this.nationalityList = result.items;
      this.feedNationalityOptions(result.items);

      this.patchFormValue();
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
      id: [null, Validators.required],
      name: [null, Validators.required],
      companyType: [null, Validators.required],
      nationalityInput: [null, Validators.required],
      nationality: [null, Validators.required],
      description: [null],
      registerDate: [null, Validators.required],
      contacts: this.formBuilder.array([])
    });
  }

  formValueClone: IndividualPartyDTO;
  patchFormValue(): void {
    this.createContacts();
    this.form.patchValue(this.data);
    this.form.controls.nationalityInput.setValue(this.nationalityList.find(n => n.code === this.data.nationality));

    this.formValueClone = _cloneDeep(this.form.value);
  }

  createContacts(): void {
    this.data.contacts.forEach((c, index) => {
      this.addContactForm();
      this.addValuePartOfContactForm({ value: c.type }, index);
    });
  }

  /**
   * Nationality AutoComplete
   */
  nationlitiesOptions: Observable<LocationDTO[]>;
  nationalityList: LocationDTO[] = [];
  feedNationalityOptions(list: LocationDTO[]) {
    this.nationlitiesOptions = FormUtilities.observeOnInput<LocationDTO>(list,
      this.form.controls.nationalityInput,
      this.form.controls.nationality,
      'code',
      'name');
  }

  displayFnNationality(nationality: LocationDTO): string {
    return nationality && nationality.name ? nationality.name : '';
  }

  //#region Contact Management
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

  addValuePartOfContactForm(event: MatSelectChange | any, index: number): void {
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
    contact.addControl('value', formControl as AbstractControl);

    if (event.value === CONTACT_INFO_TYPE.physicalAddress) {
      this.getCities(index);
    } else if (event.value === CONTACT_INFO_TYPE.email || event.value === CONTACT_INFO_TYPE.cellphone) {
      let otpFormControl = new FormControl(null, [Validators.required]);
      contact.addControl('otp', otpFormControl);
    }
  }

  disableOtpButton(contactForm: FormGroup, index: number) {
    return contactForm.controls.value.invalid ||
      (this.formValueClone.contacts[index] &&
        contactForm.controls.value.value === this.formValueClone.contacts[index].value);
  }

  requestOtpCodeCellphone(contactForm: FormGroup) {
    contactForm.controls.otp.setValue(null);
    let otpDto: OtpDTO = {
      key: contactForm.controls.value.value,
      scenario: OTP_SCENARIO.confirmCellPhone,
      captcha: 'S'
    };

    this.otpService.otp(otpDto).subscribe((result: OtpViewDto) => {
      contactForm.controls.otp.setValue(result.otp);
    }, error => {

    })
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
        this.setCityValue(index);
      });
    } else {
      this.feedCitiesOptions(index);
      this.setCityValue(index);
    }
  }

  get citiesSearchParams(): SearchParams {
    let params = new SearchParams();
    let filter: Filter = {
      field: 'type',
      operator: FILTER_OPERATION.equal,
      value: 'city'
    };

    params.filter = JSON.stringify({});

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

  setCityValue(index: number): void {
    if (this.data.contacts[index]) {
      let contact: FormGroup = this.getContactFormByIndex(index);
      let city: LocationDTO = this.cityList.find(c => c.code === (this.data.contacts[index].value as any).city) as LocationDTO;
      (contact.controls.value as FormGroup).controls.cityInput.setValue(city);
    }
  }
  //#endregion 

  updateWithPut(): boolean {
    return true;
  }

  save(): void {
    this.loading = true;
    const subResult = this.partyService.updateOrganizationParty(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.dialogRef.close();
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.savingWasNotSuccessful);
    });

    this.subscriptions$.add(subResult);
  }

  prepareModel(): OrganizationPartyDTO {
    let formattedDate = moment(this.form.controls.registerDate.value).format(DATE_FORMAT.date);
    this.form.controls.registerDate.setValue(formattedDate);

    delete this.form.value.nationalityInput;
    delete this.form.value.type;

    this.form.value.contacts
      .filter((contact: any) => (contact.value as any)?.cityInput)
      .forEach((contact: any) => {
        delete (contact.value as any).cityInput;
      });

    return this.form.value;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
