import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/client-services';
import { PERMISSIONS } from 'src/app/shared/data';
import { Permissions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services/_base.service';
import { AppInjector } from 'src/app/shared/utilities/injector.utilities';

@Component({
  selector: 'era-edit-base',
  template: ``,
})
export abstract class EditBaseComponent<T> implements OnInit, OnDestroy {
  subscriptions$: Subscription = new Subscription();
  notificationService: NotificationService;
  translate: TranslateService;
  formBuilder: FormBuilder;
  title = '';

  constructor(public baseService: BaseService<T>) {
    let injector: Injector;
    injector = AppInjector.getInjector();
    this.notificationService = injector.get(NotificationService);
    this.formBuilder = injector.get(FormBuilder);
    this.translate = injector.get(TranslateService);
  }
  
  abstract form: any;
  abstract buildForm(): void;
  abstract patchFormValue(): void;
  abstract prepareModel(): T;
  abstract updateWithPut(): boolean;
  abstract getTitleToken(): string;
  
  loading = false;

  permissions: Permissions = PERMISSIONS;

  /**
   * @description Inherited classes must call this function (super.ngOnInit)
   */
  ngOnInit():void {
    this.buildForm();
    this.setTitle();
  }

  setTitle() :void{
    this.translate.get(this.getTitleToken()).subscribe(value => {
      this.translate.get('EDIT_THIS', { value }).subscribe(value => {
        this.title = value;
      });
    });
  }

  ngOnDestroy():void {
    this.subscriptions$.unsubscribe();
  }
}
