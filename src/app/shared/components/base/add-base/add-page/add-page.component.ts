import { Component } from '@angular/core';
import { COMMON_MESSAGES } from 'src/app/shared/data';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { BaseService } from 'src/app/shared/services';
import { AddBaseComponent } from '../add-base.component';

@Component({
  selector: 'era-add-page',
  template: '',
})
export abstract class AddPageComponent<T> extends AddBaseComponent<T>{

  constructor(public baseService: BaseService<T>) {
    super(baseService);
  }

  abstract getListPageAddress(): string;

  save():void {
    this.loading = true;
    const subResult = this.baseService.create(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.router.navigate([this.getListPageAddress()]);
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.savingWasNotSuccessful)
    });

    this.subscriptions$.add(subResult);
  }
}
