import { SnotifyToastConfig } from "ng-snotify";

export let notificationConfig: SnotifyToastConfig = {
    timeout: 3000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 },
}