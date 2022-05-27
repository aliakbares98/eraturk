import { Injectable, Injector } from '@angular/core';
import { SupplierProductDTO } from '../dto/supplier-product.dto';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierProductService extends BaseService<SupplierProductDTO>{

  constructor(public injector: Injector) {
    super('supplierProducts', injector);
  }
}