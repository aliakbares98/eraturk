import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PERMISSIONS, PROFILE_MENU_ITEMS } from 'src/app/shared/data';
import { Permissions } from "src/app/shared/interfaces/permissions.interface";
import { AccountService } from 'src/app/shared/services';

@Component({
  selector: 'era-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private accountService: AccountService,
    private router: Router) { }
  
  @Output() clickOnItem: EventEmitter<MouseEvent> = new EventEmitter();

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

  onMenuItemClicked(e: MouseEvent) {
    this.clickOnItem.emit(e);
  }

  permissions: Permissions = PERMISSIONS;
  menuItems: MenuItem[] = PROFILE_MENU_ITEMS;
}
