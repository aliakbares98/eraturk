import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/client-services';
import { HEADER_MENU_ITEMS, MenuItem } from 'src/app/shared/data';
import { AccountService } from 'src/app/shared/services';
import { slice as _slice } from 'lodash-es';

@Component({
  selector: 'era-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private accountService: AccountService,
    private storageService: StorageService,
    private router: Router) { }

  numberOfMainItems = 5;
  mainHeaderItems: MenuItem[] = _slice(HEADER_MENU_ITEMS, 0, this.numberOfMainItems);
  moreHeaderItems: MenuItem[] = _slice(HEADER_MENU_ITEMS, this.numberOfMainItems);

  username: string;
  ngOnInit(): void {
    if (this.userIsLoggedIn) {
      this.username = this.storageService.getUsername() as string;
    }
  }

  get userIsLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  isSearching = false;
  showMoreMenu = false;

  OnSearchClick(event: MouseEvent) {
    this.isSearching = !this.isSearching;
    event.stopPropagation();
  }

  logout() {
    this.accountService.logout().subscribe(result => {
      this.router.navigate(['/']);
    });
  }
}
