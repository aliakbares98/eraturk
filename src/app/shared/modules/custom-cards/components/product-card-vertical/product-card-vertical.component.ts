import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierProductResponseDTO } from 'src/app/shared/dto/supplier-product.dto';
import { v4 } from 'uuid';

@Component({
  selector: 'era-product-card-vertical',
  templateUrl: './product-card-vertical.component.html',
  styleUrls: ['./product-card-vertical.component.scss']
})
export class ProductCardVerticalComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() supplierProduct: SupplierProductResponseDTO;
  loading = true;
  ngOnInit(): void {

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onCardClicked(event: MouseEvent) {
    this.router.navigate([`/product-details/${v4()}`]);
  }
}
