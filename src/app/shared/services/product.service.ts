import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponseDTO, ProductDTO, ProductTemplateDTO } from '../dto';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<ProductDTO | ProductTemplateDTO>{

  constructor(public injector: Injector) {
    super('products', injector);
  }

  createTemplate(model: ProductTemplateDTO): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(`${this.apiAddress}/template/`, model);
  }

  updateTemplate(model: ProductTemplateDTO): Observable<CommandResponseDTO> {
    return this.http.put<CommandResponseDTO>(`${this.apiAddress}/template/${model.id}`, model)
  }
}