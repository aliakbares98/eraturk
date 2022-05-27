
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OtpDTO, OtpViewDto } from '../dto';

@Injectable()
export class OtpService {
  apiAddress: string;
  constructor(private http: HttpClient) {
    this.apiAddress = environment.apiEndPoint + '/otp';
   }

  otp(model: OtpDTO): Observable<OtpViewDto> {
    return this.http.post<OtpViewDto>(this.apiAddress, model);
  }

}

