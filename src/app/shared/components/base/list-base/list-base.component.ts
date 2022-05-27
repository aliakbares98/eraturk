import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/client-services';
import { FilterComponent } from 'src/app/shared/components/filter-component/filter.component';
import { matDialogConfig } from 'src/app/shared/configs';
import { FILTER_LOGIC, PERMISSIONS } from 'src/app/shared/data';
import { Permissions } from 'src/app/shared/interfaces/permissions.interface';
import { AdvancedFilter, DatatableSortModel, DeepFilter } from 'src/app/shared/models';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { DeleteDialogComponent } from 'src/app/shared/modules/dialogs/components/delete-dialog/delete-dialog.component';
import { BaseService } from 'src/app/shared/services/_base.service';
import { AppInjector } from 'src/app/shared/utilities/injector.utilities';

@Component({
  selector: 'era-list-base',
  template: ``,
})
export abstract class ListBaseComponent<T> implements OnInit, OnDestroy {

  /**
   * @description MatDialog instance
   */
  dialog: MatDialog;
  notificatoin: NotificationService;

  constructor(public baseService: BaseService<T>) {
    /**
     * @description Getting global injector to instatiate objects without DI
     */
    const injector: Injector = AppInjector.getInjector();
    this.dialog = injector.get(MatDialog);
    this.notificatoin = injector.get(NotificationService);
  }

  /**
   * @description To handle unsubscribing
   */
  subscriptions$: Subscription = new Subscription();

  /**
   * @description datatable options to use in HTML files in order to config datatable
   */
  datatableInputs: { [key: string]: any } = {
    loading: false,
    columnMode: "force",
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    reorderable: true,
    externalPaging: true,
    count: 0,
    offset: 0,
    limit: 10,
  }

  /**
   * @description Rows of data will be stored in this array 
   */
  rows: T[] = [];

  /**
   * @description An abstract array to manage datatable comlumns
   */
  abstract columns: any[];
  /**
   * @description User must set up columns in this function
   */
  abstract setColumns(): void;

  /**
   * @description An object to store filtering items, that will be sent in getAll requests (list) to get filtered data.   
   */
  public searchParams: SearchParams;
  /**
   * @description This fucntion initializes this.searchParams object. 
   */
  abstract initialSearchParams(): void;

  permissions: Permissions = PERMISSIONS;

  /**
   * @description Drived classes must call this function (super.ngAfterViewInit)
   */
  ngOnInit(): void {
    this.getAllByFilter();
    setTimeout(() => {
      this.setColumns();
    });
  }

  /**
   * @description Getting list of data based on searchParams
   */
  getAllByFilter(): void {
    const sub = this.baseService.getAll<any>(this.getSearchParams()).subscribe(result => {
      this.rows = [...result.items];
      this.datatableInputs.count = result.totalCount;
    });

    this.subscriptions$.add(sub);
  }

  getSearchParams(): string {
    if (!this.searchParams) {
      this.initialSearchParams();
    }

    return this.searchParams.stringify();
  }

  addFilter(column: any): void {
    let filter: DeepFilter = new DeepFilter(column.prop, FILTER_LOGIC.and, []);

    if (this.searchParams.filter) {
      let parsedFilter: any = JSON.parse(this.searchParams.filter);

      /**
       * @description parsedFilter is type of AdvancedFilter
       */
      if (parsedFilter.filters && parsedFilter.logic && !parsedFilter.name) {
        let searchedFilter = parsedFilter.filters.find((f: any) => f.name === column.prop);
        parsedFilter.filters = parsedFilter.filters.filter((f: any) => f != searchedFilter);
        this.searchParams.filter = JSON.stringify(parsedFilter);

        filter = searchedFilter ? searchedFilter : filter;
      }

      /**
       * @description parsedFilter is type of DeepFilter
       */
      else if (parsedFilter.filters && parsedFilter.logic && parsedFilter.name) {
        let advancedFilter = new AdvancedFilter(FILTER_LOGIC.and, []);
        advancedFilter.filters = parsedFilter.name === column.prop ? [] : [parsedFilter];

        this.searchParams.filter = JSON.stringify(advancedFilter);
      } else if (parsedFilter.field) {
        let deepFilter = new DeepFilter('initialFilterToGetData');
        deepFilter.filters.push(parsedFilter);
        let advancedFilter = new AdvancedFilter();
        advancedFilter.filters.push(deepFilter);
        this.searchParams.filter = JSON.stringify(advancedFilter);
      }
    } else {
      let advancedFilter = new AdvancedFilter();
      this.searchParams.filter = JSON.stringify(advancedFilter);
    }

    const dialogRef = this.dialog.open(FilterComponent, { ...matDialogConfig, data: filter });
    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result && (result as DeepFilter).filters.length) {
        let parsedFilter = JSON.parse(this.searchParams.filter);
        parsedFilter.filters.push(<DeepFilter>result);
        this.searchParams.filter = JSON.stringify(parsedFilter);
      }
      this.getAllByFilter();
    });

    this.subscriptions$.add(sub);
  }

  /**
   * @description Listener for pagination event in datatable
   * @param {Object} event A simple object contains data about pagination event : offset, limit, pageSize, pageIndex 
   */
  setPage(event: { [key: string]: any }): void {
    this.searchParams.pageIndex = event.offset;
    this.searchParams.pageSize = event.limit;

    this.getAllByFilter();
  }

  /**
   * @description Listener for sort event in datatable
   * @param {Object} event A simple object contains data about sort event : column, lastValue, newValue 
   */
  sortArray: DatatableSortModel[] = [];
  sort(event: { [key: string]: any }): void {
    const sortItem = this.sortArray.find(item => item.field === event.column.prop);
    if (sortItem) {
      sortItem.type = event.newValue;
    } else {
      this.sortArray.push({ field: event.column.prop, type: event.newValue });
    }

    this.searchParams.sort = JSON.stringify(this.sortArray);
  }                                 

  

  /**
   * @description Opens confirmation dialog for deletion
   * @param {string} id The id of entity, is going to be deleted
   */
  remove(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, matDialogConfig);
    const sub = dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.delete(id);
      }
    });
    this.subscriptions$.add(sub);
  }

  /**
   * @description Calls delete fucntions
   * @param {string} id The id of entity, is going to be deleted
   */
  delete(id: string): void {
    const sub = this.baseService.delete(id).subscribe(result => {
      this.getAllByFilter();
    });

    this.subscriptions$.add(sub);
  }

  /**
   * @description Unsubscribing observables. User must call this fucntions from ngOnDestroy in child component to unsubscribe
   */
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
