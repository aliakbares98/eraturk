import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { CommentingModule } from 'src/app/shared/modules/commenting/commenting.module';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { GallerySliderModule } from 'src/app/shared/modules/gallery-slider/gallery-slider.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { StarRatingModule } from '../star-rating/star-rating.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';


@NgModule({
  declarations: [
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SwiperModule,
    SwiperHeaderModule,
    FlexLayoutModule,
    CustomCardsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    StarRatingModule,
    MatTabsModule,
    CommentingModule,
    GallerySliderModule
  ]
})
export class ProductDetailsModule { }
