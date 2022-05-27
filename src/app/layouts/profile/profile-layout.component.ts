import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/client-services';
import { CultureViewDTO } from 'src/app/shared/dto';
import { SearchParams } from 'src/app/shared/models';
import { AccountService, CultureService } from 'src/app/shared/services';

@Component({
  selector: 'era-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;

  constructor(private authenticationService: AccountService,
    private cultureService: CultureService,
    private translate: TranslateService,
    private storageService: StorageService,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
  }

  cultures: CultureViewDTO[] = [];
  currentLanguage: string;

  ngOnInit(): void {
    this.getCultures();
    this.setCurrentLanguage();
  }

  getCultures(): void {
    this.cultureService.getAll<CultureViewDTO>(new SearchParams().stringify()).subscribe(result => {
      this.cultures = result.items;
    });
  }

  setCurrentLanguage(): void {
    this.currentLanguage = this.translate.currentLang;
    this.translate.onLangChange.subscribe((value: any) => {
      this.currentLanguage = value.lang;
    })
  }

  changeLanguage(culture: CultureViewDTO): void {
    this.translate.use(culture.name);
    this.storageService.storeSelectedLanguage(culture.name);
  }

  logout(): void {
    this.authenticationService.logout().subscribe();
  }

  @ViewChild('snav') snav: MatSidenav;
  onClickedSideMenuItem() {
    if (this.mobileQuery.matches) {
      this.snav.close();
    }
  }
}
