import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'era-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(readonly bottomSheet: MatBottomSheet) { }
  @Input('data') meals: string[] = [];
  page: number = 1;
  ngOnInit(): void {
  }

  categorySelected() { }

  @ViewChild('filters') filters: TemplateRef<any>;
  openFilters() {
    this.bottomSheet.open(this.filters);
  }
  @ViewChild('ordering') ordering: TemplateRef<any>;
  openOrdering() {
    this.bottomSheet.open(this.ordering);
  }
}
