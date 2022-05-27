import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services';

@Component({
  selector: 'era-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void { }

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
