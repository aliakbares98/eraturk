
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageAddresses } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services';
import { AppInjector } from 'src/app/shared/utilities';
import { ListBaseComponent } from '../list-base.component';

@Component({
  selector: 'era-list-page',
  template: '',
})
export abstract class ListPageComponent<T> extends ListBaseComponent<T> implements OnInit, OnDestroy {

  router: Router;

  constructor(public baseService: BaseService<T>) {
    super(baseService);

    /**
     * @description Getting global injector to instatiate objects without DI
     */
    const injector: Injector = AppInjector.getInjector();
    this.router = injector.get(Router);
  }

  abstract getPageAddresses(): PageAddresses;

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAdd(): void {
    this.router.navigate([this.getPageAddresses().add]);
  }

  openEdit(row: T): void {
    this.router.navigate([this.getPageAddresses().edit, (row as any).id]);
  }
  
}
