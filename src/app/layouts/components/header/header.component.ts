import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services';

@Component({
  selector: 'era-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
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
}
