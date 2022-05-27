import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { SaveRoutingModule } from './saved-items-routing.module';
import { SavedItemsComponent } from './saved-items.component';



@NgModule({
  declarations: [
    SavedItemsComponent
  ],
  imports: [
    CommonModule,
    SaveRoutingModule,
    BaseImportsModule,
    RouterModule,
    MatButtonToggleModule,
    SwiperHeaderModule,
    SwiperModule,
    CustomCardsModule,
    NgxPaginationModule,
  ]
})
export class SavedItemsModule { }
