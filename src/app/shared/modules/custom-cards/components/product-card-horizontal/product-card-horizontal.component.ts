import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierProductResponseDTO } from 'src/app/shared/dto/supplier-product.dto';
import { v4 } from 'uuid';

@Component({
  selector: 'era-product-card-horizontal',
  templateUrl: './product-card-horizontal.component.html',
  styleUrls: ['./product-card-horizontal.component.scss']
})
export class ProductCardHorizontalComponent implements OnInit {
  constructor(private router: Router) { }

  @Input() supplierProduct: SupplierProductResponseDTO;
  loading = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  onCardClicked(event: MouseEvent) {
    this.router.navigate([`/product-details/${v4()}`]);
  }
}
