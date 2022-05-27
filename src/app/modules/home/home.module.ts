import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { CustomCardsModule } from 'src/app/shared/modules/custom-cards/custom-cards.module';
import { SwiperHeaderModule } from 'src/app/shared/modules/swiper-header/swiper-header.module';
import { SwiperModule } from 'swiper/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    SwiperModule,
    MatToolbarModule,
    MatMenuModule,
    CustomCardsModule,
    MatDividerModule,
    MatListModule,
    BaseImportsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    SwiperHeaderModule,
  ],
})
export class HomeModule { }
