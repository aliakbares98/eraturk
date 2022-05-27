import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services';

@Component({
  selector: 'era-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private accountService: AccountService) {
  }

  IsLoggedIn: boolean;

  ngOnInit(): void {
    this.checkUserIsLogin();
  }

  checkUserIsLogin(): void {
    this.IsLoggedIn = this.accountService.isLoggedIn();
  }

  get userIsLoggedIn(): boolean {
    return this.IsLoggedIn !== undefined && this.IsLoggedIn === true;
  }

  logout(): void {
    this.accountService.logout().subscribe(result => {
      this.checkUserIsLogin();
    });
  }
}
