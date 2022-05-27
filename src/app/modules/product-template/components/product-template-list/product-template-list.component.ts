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
import { ProductCategoryDTO, ProductTemplateDTO } from 'src/app/shared/dto';
import { PageAddresses } from 'src/app/shared/interfaces';
import { Filter, SearchParams } from 'src/app/shared/models';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'era-product-template-list',
  templateUrl: './product-template-list.component.html',
  styleUrls: ['./product-template-list.component.scss']
})
export class ProductTemplateListComponent extends ListPageComponent<ProductTemplateDTO> implements OnInit, OnDestroy {
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
      value: "ProductTemplate"
    };

    this.searchParams = new SearchParams();
    this.searchParams.filter = JSON.stringify(initialFilter);
    this.searchParams.expands = 'category'
  }

  @ViewChild('filterable') filterable: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[] = [];
  setColumns(): void {
    this.columns = [
      { prop: 'title',name:new AsyncPipe(this.ref).transform(this.translateService.get('TITLE')), headerTemplate: this.filterable },
      { prop: 'description',name:new AsyncPipe(this.ref).transform(this.translateService.get('DESCRIPTOIN')), headerTemplate: this.filterable },
      { prop: 'category', name:new AsyncPipe(this.ref).transform(this.translateService.get('CATEGORY')), sortable: false, pipe: new CategoryTransformer() },
      { prop: 'actions', name:new AsyncPipe(this.ref).transform(this.translateService.get('ACTIONS')), cellTemplate: this.actions },
    ]
  }

  getPageAddresses(): PageAddresses {
    return {
      add: '/profile/product-template/add',
      edit: '/profile/product-template/edit'
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

class CategoryTransformer implements PipeTransform {
  transform(category: ProductCategoryDTO): string {
    return category.title;
  }
}
