import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../client-services';
import { DocumentViewDTO } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  apiAddress = '';
  constructor(public http: HttpClient,
    private errorService: ErrorService) {
    this.apiAddress = environment.apiEndPoint + '/documents';
  }

  create(model: FormData): Observable<any> {
    return this.http.post(this.apiAddress, model);
  }

  get(id: string, expands?: string): Observable<DocumentViewDTO> {
    const url = `${this.apiAddress}/${id}` + (expands ? `?Expands=${expands}` : '');
    return this.http.get<DocumentViewDTO>(url);
  }

  download(id: string): Observable<DocumentViewDTO> {
    return this.http.get<DocumentViewDTO>(`${this.apiAddress}/${id}/download`);
  }
}