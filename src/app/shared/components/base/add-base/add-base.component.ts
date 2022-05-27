import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/client-services';
import { PERMISSIONS } from 'src/app/shared/data';
import { Permissions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services';
import { AppInjector } from 'src/app/shared/utilities';

@Component({
  selector: 'era-add-base',
  template: ``,
})
export abstract class AddBaseComponent<T> implements OnInit, OnDestroy {
  subscriptions$: Subscription = new Subscription();
  notificationService: NotificationService;
  translate: TranslateService;
  formBuilder: FormBuilder;
  router: Router;
  loading: boolean = false;
  title = '';

  constructor(public baseService: BaseService<T>) {
    let injector = AppInjector.getInjector();
    this.notificationService = injector.get(NotificationService);
    this.formBuilder = injector.get(FormBuilder);
    this.router = injector.get(Router);
    this.translate = injector.get(TranslateService);
  }

  abstract form: FormGroup;
  abstract buildForm(): void;
  abstract prepareModel(): T;
  abstract getTitleToken(): string;

  permissions: Permissions = PERMISSIONS;

  /**
   * @description Inherited classes must call this function (super.ngOnInit)
   */
  ngOnInit() :void{
    this.buildForm();
    this.setTitle();
  }

  setTitle() :void{
    this.translate.get(this.getTitleToken()).subscribe(value => {
      this.translate.get('ADD_THIS', { value }).subscribe(value => {
        this.title = value;
      });
    });
  }

  ngOnDestroy():void {
    this.subscriptions$.unsubscribe();
  }
}

