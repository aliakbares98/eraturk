import { LocationService } from './../../../../shared/services/location.service';
import { Observable } from 'rxjs';
import { LocationDTO } from './../../../../shared/dto/location.dto';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { phoneOrEmailValidator } from 'src/app/shared/directives';
import { FormUtilities } from 'src/app/shared/utilities';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { Filter, SearchParams } from 'src/app/shared/models';


@Component({
  selector: 'era-personal-info-edit',
  templateUrl: './personal-info-edit.component.html',
  styleUrls: ['./personal-info-edit.component.scss']
})
export class PersonalInfoEditComponent implements OnInit {
  nationlitiesOptions: Observable<LocationDTO[]>;

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  form: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phoneNumber: [null, Validators.required, phoneOrEmailValidator],
    country: [null, Validators.required],
    province: [null, Validators.required],
    nationalityInput: [null, Validators.required],
    nationality: [null, Validators.required],
  })
  ngOnInit(): void {
    this.getNationalities();

  }
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




  send() { }

}
