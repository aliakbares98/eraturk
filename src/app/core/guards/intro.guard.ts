import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserObjectsService } from 'src/app/shared/client-services/browser-objects.service';
import { AccountService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private router: Router,
    private browserObjectService: BrowserObjectsService,
    private accountService: AccountService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.accountService.isLoggedIn() &&
      this.browserObjectService.windowRef().innerWidth < 557) {
      this.router.navigate(['/intro']);
      return false;
    } else {
      return true;
    }
  }
}
