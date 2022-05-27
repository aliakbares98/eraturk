import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    CustomCardsModule,
    SwiperModule,
    SwiperHeaderModule,
    MatIconModule,
    NgxPaginationModule,
    MatBottomSheetModule,
    TranslateModule.forChild()
  ]
})
export class ProductsModule { }
