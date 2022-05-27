import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, PipeTransform, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ListPageComponent } from 'src/app/shared/components/base/list-base/list-page/list-page.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { PARTY_TYPE } from 'src/app/shared/data/party-type.data';
import { IndividualPartyDTO } from 'src/app/shared/dto/individual-party.dto';
import { PageAddresses } from 'src/app/shared/interfaces';
import { Filter, SearchParams } from 'src/app/shared/models';
import { PartyService } from 'src/app/shared/services/party.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'era-individual-party-list',
  templateUrl: './individual-party-list.component.html',
  styleUrls: ['./individual-party-list.component.scss']
})
export class IndividualPartyListComponent extends ListPageComponent<IndividualPartyDTO> implements OnInit, OnDestroy {
  constructor(public partyService: PartyService,
    public translateService:TranslateService,
    public ref:ChangeDetectorRef,
    public datePipe: DatePipe) {
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
      value: PARTY_TYPE.individualParty
    }

    this.searchParams.filter = JSON.stringify(filter);
  }

  @ViewChild('filterable') filterable: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[];
  setColumns(): void {
    this.columns = [
      { prop: 'firstName',name:new AsyncPipe(this.ref).transform(this.translateService.get('NAME')), headerTemplate: this.filterable },
      { prop: 'lastName',name:new AsyncPipe(this.ref).transform(this.translateService.get('LAST_NAME')), headerTemplate: this.filterable },
      { prop: 'birthDate',name:new AsyncPipe(this.ref).transform(this.translateService.get('BIRTH_DATE')), pipe: new BirthDatePipe(this.datePipe) },
      { prop: 'nationality',name:new AsyncPipe(this.ref).transform(this.translateService.get('NATIONALITY')), headerTemplate: this.filterable },
      { prop: 'description',name:new AsyncPipe(this.ref).transform(this.translateService.get('DESCRIPTOIN')), headerTemplate: this.filterable },
      { prop: 'actions',name:new AsyncPipe(this.ref).transform(this.translateService.get('ACTIONS')), cellTemplate: this.actions }
    ]
  }

  getPageAddresses(): PageAddresses {
    return {
      add: '/profile/individual-party/add',
      edit: '/profile/individual-party/edit'
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

class BirthDatePipe implements PipeTransform {
  datePipe;
  constructor(private _datePipe: DatePipe) {
    this.datePipe = this._datePipe;
  }
  transform(birthDate: string): string | null {
    return this.datePipe.transform(birthDate);
  }
}


