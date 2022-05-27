import { AsyncPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  PipeTransform,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ListPageComponent } from 'src/app/shared/components/base/list-base/list-page/list-page.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { ProductDTO, ProductTemplateDTO } from 'src/app/shared/dto';
import { PageAddresses } from 'src/app/shared/interfaces';
import { Filter, SearchParams } from 'src/app/shared/models';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'era-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ListPageComponent<ProductDTO> implements OnInit, OnDestroy {

  constructor(public productService: ProductService, public translateService: TranslateService, public ref: ChangeDetectorRef) {
    super(productService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialSearchParams(): void {
    let initialFilter = <Filter>{
      field: 'subType',
      operator: FILTER_OPERATION.equal,
      value: "FinalProduct"
    };

    this.searchParams = new SearchParams();
    this.searchParams.filter = JSON.stringify(initialFilter);
    this.searchParams.expands = 'parent';
  }

  @ViewChild('filterable') filterable: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[] = [];
  setColumns(): void {
    this.columns = [
      { prop: 'title',name:new AsyncPipe(this.ref).transform(this.translateService.get('TITLE')), headerTemplate: this.filterable },
      { prop: 'description',name:new AsyncPipe(this.ref).transform(this.translateService.get('DESCRIPTOIN')), sortable: false, headerTemplate: this.filterable },
      { prop: 'parent', name:new AsyncPipe(this.ref).transform(this.translateService.get('PARENT')), sortable: false, pipe: new TemplateTransformer() },
      { prop: 'actions', name:new AsyncPipe(this.ref).transform(this.translateService.get('ACTIONS')), cellTemplate: this.actions }
    ]
  }

  getPageAddresses(): PageAddresses {
    return {
      add: '/profile/product/add',
      edit: '/profile/product/edit'
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

class TemplateTransformer implements PipeTransform {
  transform(parent: ProductTemplateDTO) {
    return parent.title;
  }
}

