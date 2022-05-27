import { Component, Input, OnInit } from '@angular/core';
import { ProductBrandViewDTO } from 'src/app/shared/dto';

@Component({
  selector: 'era-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {

  constructor() { }

  @Input() productBrand: ProductBrandViewDTO;
  ngOnInit(): void {

  }
}
