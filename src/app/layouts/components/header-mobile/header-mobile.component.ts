
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/client-services';
import { HEADER_MENU_ITEMS, MenuItem } from 'src/app/shared/data';
import { AccountService } from 'src/app/shared/services';
@Component({
  selector: 'era-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private accountService: AccountService,
    private router: Router,
    private storageService: StorageService) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  username: string;

  headerItems: MenuItem[] = HEADER_MENU_ITEMS;
  ngOnInit(): void {
    if (this.userIsLoggedIn) {
      this.username = this.storageService.getUsername() as string;
    }
  }

  get userIsLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  logout() {
    this.accountService.logout().subscribe(result => {
      this.router.navigate(['/intro']);
    });
  }
}
