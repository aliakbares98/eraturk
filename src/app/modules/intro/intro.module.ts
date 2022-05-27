import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro.component';



@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    IntroRoutingModule,
    SwiperModule,
    TranslateModule
  ]
})
export class IntroModule { }
