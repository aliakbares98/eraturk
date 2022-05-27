import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SwiperHeaderComponent } from './swiper-header.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SwiperHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),

  ],
  exports: [
    SwiperHeaderComponent
  ]
})
export class SwiperHeaderModule { }
