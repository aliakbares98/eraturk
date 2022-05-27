import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMON_MESSAGES } from 'src/app/shared/data';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { BaseService } from 'src/app/shared/services';
import { AddBaseComponent } from '../add-base.component';

@Component({
  selector: 'era-add-dialog',
  template: '',
})
export abstract class AddDialogComponent<T> extends AddBaseComponent<T>{
  constructor(public baseService: BaseService<T>,
    public dialogRef: MatDialogRef<any>) {
    super(baseService);
  }

  save():void {
    this.loading = true;
    const subResult = this.baseService.create(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.closeDialog(result);
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.savingWasNotSuccessful)
    });

    this.subscriptions$.add(subResult);
  }

  closeDialog(addResult?: CommandResponseDTO) {
    this.dialogRef.close(addResult ? addResult : null);
  }
}
