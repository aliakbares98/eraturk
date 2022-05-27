import { Observable } from 'rxjs';
import { CommandResponseDTO } from '../dto';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../client-services';
import { ListViewDTO } from '../dto/_list-response.dto';
import { environment } from 'src/environments/environment';

export class BaseService<T> {
  http: HttpClient;
  errorService: ErrorService;

    apiAddress: string;
  constructor(private controlName: string,
    public injector: Injector) {
    this.apiAddress = `${environment.apiEndPoint}/${this.controlName}`;

    this.http = this.injector.get(HttpClient);
    this.errorService = this.injector.get(ErrorService);
  }

  getAll<returnType>(filters: string): Observable<ListViewDTO<returnType>> {
    return this.http.get<ListViewDTO<returnType>>(`${this.apiAddress}/${filters}`);
  }

  // get<returnType>(id: string, expands?: string): Observable<returnType> {
  //   return this.http.get<returnType>(`${this.apiAddress}/${id}` + (expands ? `?Expands=${expands}` : ''));
  // }
  get<returnType>(id: string, expand?: string): Observable<any> {
    return this.http.get<returnType>(`${this.apiAddress}`)
  }

  create(model: T): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(`${this.apiAddress}`, model);
  }

  update(model: T): Observable<CommandResponseDTO> {
    return this.http.put<CommandResponseDTO>(`${this.apiAddress}/${(model as any).id}`, model);
  }

  updatePatch(model: T): Observable<CommandResponseDTO> {
    return this.http.patch<CommandResponseDTO>(`${this.apiAddress}/${(model as any).id}`, model);
  }

  delete(id: string): Observable<CommandResponseDTO> {
    return this.http.delete<CommandResponseDTO>(`${this.apiAddress}/${id}`);
  }
}
