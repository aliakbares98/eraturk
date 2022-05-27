import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseImportsModule } from '../base-imports/base-imports.module';
import { BrandCardComponent } from './components/brand-card/brand-card.component';
import { ProductCardContentComponent } from './components/product-card-content/product-card-content.component';
import { ProductCardHorizontalComponent } from './components/product-card-horizontal/product-card-horizontal.component';
import { ProductCardVerticalComponent } from './components/product-card-vertical/product-card-vertical.component';



@NgModule({
  declarations: [
    ProductCardHorizontalComponent,
    ProductCardVerticalComponent,
    ProductCardContentComponent,
    BrandCardComponent
  ],
  imports: [
    CommonModule,
    BaseImportsModule
  ],
  exports: [
    ProductCardHorizontalComponent,
    ProductCardVerticalComponent,
    ProductCardContentComponent,
    BrandCardComponent
  ]
})
export class CustomCardsModule { }
