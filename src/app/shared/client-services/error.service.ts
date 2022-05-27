
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { COMMON_MESSAGES } from '../data';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationService: NotificationService,
    private router: Router,
    private authService: AccountService,
    private dialog: MatDialog) { }

  handle400Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
  }

  handle401Error(error: HttpErrorResponse) {
    this.notificationService.clear();
    this.notificationService.showError(this.getErrorMessage(error));
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }

  handle403Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }

  handle405Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
  }

  handle409Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessageAdvanced(error));
  }

  handle500Error(error?: HttpErrorResponse) {
    this.notificationService.showError(COMMON_MESSAGES.serverIsNotResponsible);
  }

  getErrorMessage(error: HttpErrorResponse): string {
    return error.error && error.error.message ? error.error.message : (error.statusText ? error.statusText : COMMON_MESSAGES.unknownError);
  }

  getErrorMessageAdvanced(error: HttpErrorResponse): string {
    if (error.error.parameters) {
      let message = error.error.message.replace(/{\w+}/g, function (something: string) {
        let number = something.substring(1, something.length - 1);
        return error.error.parameters[Number(number)] || something;
      });
      return message;
    }

    return error.error.message as string;
  }
}
