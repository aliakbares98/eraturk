import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommentingModule } from 'src/app/shared/modules/commenting/commenting.module';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { StarRatingModule } from '../star-rating/star-rating.module';
import { VideoDetailsRoutingModule } from './video-details-routing.module';
import { VideoDetailsComponent } from './video-details.component';

@NgModule({
  declarations: [
    VideoDetailsComponent
  ],
  imports: [
    CommonModule,
    VideoDetailsRoutingModule,
    MatFormFieldModule,
    SwiperModule,
    SwiperHeaderModule,
    FlexLayoutModule,
    CustomCardsModule,
    MatDividerModule,
    MatIconModule,
    StarRatingModule,
    CommentingModule
  ]
})
export class VideoDetailsModule { }
