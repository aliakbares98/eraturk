import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO, ProductViewDTO } from './../../shared/dto/product.dto';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/client-services';
import { DOMUtilities } from 'src/app/shared/utilities/dom.utilities';

@Component({
  selector: 'era-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private notif: NotificationService, public productSerivce: ProductService, public route: ActivatedRoute
  ) { }

  product: ProductDTO;

  showContactInfo = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.productSerivce.get<ProductViewDTO>(params.id).subscribe((result) => {
          this.product = result;
        })

      }
    })
  }

  onClickOnLink(domElementId: string) {
    let success = DOMUtilities.copyElementText(domElementId);
    if (success) {
      this.notif.showInfo('Link copied');
    }
  }

  rate: number = 3;
  rateUpdated(rate: number) {
    this.rate = rate;
  }
}
