import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';



@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    FlexLayoutModule,
    CustomCardsModule,
    SwiperModule,
    SwiperHeaderModule,
    MatIconModule
  ]
})
export class MediaModule { }
