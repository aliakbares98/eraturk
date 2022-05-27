import { Direction } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { DIRECTION } from './shared/data';
import { CultureViewDTO } from './shared/dto';
import { culturesList } from './shared/global-variables/cultures.global-variable';

@Component({
  selector: 'era-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private overlay: OverlayContainer,
    private translate: TranslateService,
    private updates: SwUpdate) {
  }

  direction: Direction = DIRECTION.ltr;
  darkTheme = true;
  ngOnInit() {
    this.setCulture();
    this.checkPWAUpdates();
    // this.setOverlayClass();
  }

  setCulture(): void {
    this.translate.onLangChange.subscribe((result: any) => {
      let culture: CultureViewDTO = culturesList.data.find(c => c.name === result.lang) as CultureViewDTO;
      this.direction = culture && culture.rightToLeft ? DIRECTION.rtl : DIRECTION.ltr;
    })
  }

  checkPWAUpdates(): void {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  setOverlayClass(): void {
    if (this.darkTheme) {
      this.overlay.getContainerElement().classList.add('dark');
    }
  }
}