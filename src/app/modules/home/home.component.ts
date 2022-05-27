import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'era-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AccountService,
    private accountService: AccountService) {
  }

  ngOnInit(): void {






  }

  get userIsLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  isImage(extension: string) {
    return ['JPEG', 'PNG ', 'GIF ', 'TIFF ', 'PSD', 'PDF', 'EPS', 'AI', 'INDD', 'RAW '].includes(extension);
  }
}
