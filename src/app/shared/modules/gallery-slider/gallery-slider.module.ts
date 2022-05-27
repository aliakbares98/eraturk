import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'swiper/angular';
import { GallerySliderComponent } from './gallery-slider.component';



@NgModule({
  declarations: [
    GallerySliderComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    FlexLayoutModule
  ],
  exports: [
    GallerySliderComponent
  ]
})
export class GallerySliderModule { }
