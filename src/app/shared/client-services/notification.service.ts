import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyToast } from 'ng-snotify';
import { notificationConfig } from '../configs/notification.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snotify: SnotifyService) { }

  showSuccess(message: string): SnotifyToast {
    return this.snotify.success(message, notificationConfig);
  }

  showError(message: string): SnotifyToast {
    return this.snotify.error(message, notificationConfig);
  }

  showWarning(message: string): SnotifyToast {
    return this.snotify.warning(message, notificationConfig);
  }

  showInfo(message: string): SnotifyToast {
    return this.snotify.info(message, notificationConfig);
  }

  remove(id: number) {
    this.snotify.remove(id);
  }

  clear() {
    this.snotify.clear();
  }
}
