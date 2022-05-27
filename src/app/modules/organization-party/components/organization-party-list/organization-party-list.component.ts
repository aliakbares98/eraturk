import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, PipeTransform, TemplateRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ListPageComponent } from 'src/app/shared/components/base/list-base/list-page/list-page.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { PARTY_TYPE } from 'src/app/shared/data/party-type.data';
import { OrganizationPartyDTO } from 'src/app/shared/dto/organization-party.dto';
import { PageAddresses } from 'src/app/shared/interfaces';
import { Filter, SearchParams } from 'src/app/shared/models';
import { PartyService } from 'src/app/shared/services/party.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'era-organization-party-list',
  templateUrl: './organization-party-list.component.html',
  styleUrls: ['./organization-party-list.component.scss']
})
export class OrganizationPartyListComponent extends ListPageComponent<OrganizationPartyDTO> implements OnInit, OnDestroy {

  constructor(public partyService: PartyService,
    public datePipe: DatePipe,
    private translateService:TranslateService,
    private ref : ChangeDetectorRef) {
    super(partyService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialSearchParams(): void {
    this.searchParams = new SearchParams();

    let filter: Filter = {
      field: 'subType',
      operator: FILTER_OPERATION.equal,
      value: PARTY_TYPE.organizationParty
    }

    this.searchParams.filter = JSON.stringify(filter);
  }

  @ViewChild('filterable') filterable: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[];
  setColumns(): void {
    this.columns = [  
      
      { prop:'name', name: new AsyncPipe(this.ref).transform(this.translateService.get('NAME')) , headerTemplate: this.filterable },
      { prop:'nationality', name:  new AsyncPipe(this.ref).transform(this.translateService.get('NATIONALITY')) , headerTemplate: this.filterable },
      { prop:'description', name:  new AsyncPipe(this.ref).transform(this.translateService.get("DESCRIPTOIN")), headerTemplate: this.filterable },
      { prop:'componyName', name:  new AsyncPipe(this.ref).transform(this.translateService.get("COMPANY_TYPE")), headerTemplate: this.filterable },
      { prop:'registerDate', name: new AsyncPipe(this.ref).transform(this.translateService.get("REGISTER_DATE")), pipe: new RegisterDatePipe(this.datePipe) },
      { prop:'action', name: new AsyncPipe(this.ref).transform(this.translateService.get("ACTIONS")), cellTemplate: this.actions }
    ]
  }

  getPageAddresses(): PageAddresses {
    return {
      add: '/profile/organization-party/add',
      edit: '/profile/organization-party/edit'
    }
  }
  
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

class RegisterDatePipe implements PipeTransform {
  datePipe;
  constructor(private _datePipe: DatePipe) {
    this.datePipe = this._datePipe;
  }
  transform(birthDate: string): string | null {
    return this.datePipe.transform(birthDate);
  }
}