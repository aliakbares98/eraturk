import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMON_MESSAGES } from 'src/app/shared/data';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { BaseService } from 'src/app/shared/services';
import { EditBaseComponent } from '../edit-base.component';

@Component({
  selector: 'era-edit-dialog',
  template: '',
})
export abstract class EditDialogComponent<T> extends EditBaseComponent<T> implements OnDestroy {
  constructor(public baseService: BaseService<T>,
    public dialogRef: MatDialogRef<any>) {
    super(baseService);
  }

  save(): void {
    let subResult;
    if (this.updateWithPut()) {
      subResult = this.baseService.update(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
        this.closeDialog();
      }, error => {
        this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
      });
    } else {
      subResult = this.baseService.updatePatch(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
        this.closeDialog();
      }, error => {
        this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
      });
    }
    this.subscriptions$.add(subResult);
  }

  closeDialog(data?: any): void {
    this.dialogRef.close(data ? data : null);
  }
}
