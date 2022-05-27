import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { COMMON_MESSAGES } from 'src/app/shared/data';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { BaseService } from 'src/app/shared/services';
import { AppInjector } from 'src/app/shared/utilities';
import { EditBaseComponent } from '../edit-base.component';

@Component({
  selector: 'era-edit-page',
  template: '',
})
export abstract class EditPageComponent<T> extends EditBaseComponent<T> {
  router: Router;

  constructor(public baseService: BaseService<T>) {
    super(baseService);

    let injector: Injector;
    injector = AppInjector.getInjector();
    this.router = injector.get(Router);
  }

  abstract getListPageAddress(): string;

  save():void {
    let subResult;
    if (this.updateWithPut()) {
      subResult = this.baseService.update(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
        this.routeToListPage();
      }, error => {
        this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
      });
    } else {
      subResult = this.baseService.updatePatch(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
        this.routeToListPage();
      }, error => {
        this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
      });
    }
    this.subscriptions$.add(subResult);
  }

  routeToListPage() :void{
    this.router.navigate([this.getListPageAddress()]);
  }
}
