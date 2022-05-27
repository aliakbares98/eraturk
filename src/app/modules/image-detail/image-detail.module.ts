import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommentingModule } from 'src/app/shared/modules/commenting/commenting.module';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { GallerySliderModule } from 'src/app/shared/modules/gallery-slider/gallery-slider.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { ImageDetailRoutingModule } from './image-detail-routing.module';
import { ImageDetailComponent } from './image-detail.component';



@NgModule({
  declarations: [ImageDetailComponent],
  imports: [
    CommonModule,
    ImageDetailRoutingModule,
    FlexLayoutModule,
    SwiperModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SwiperModule,
    SwiperHeaderModule,
    CustomCardsModule,
    GallerySliderModule,
    CommentingModule
  ]
})
export class ImageDetailModule { }
