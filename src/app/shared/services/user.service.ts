import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordByEmailDTO, ChangePasswordByPhoneDTO } from '../../modules/authentication/dto';
import { UserDTO } from '../dto/user.dto';
import { CommandResponseDTO } from '../dto/_command-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiAddress = '';
  constructor(private http: HttpClient) {
    this.apiAddress = environment.apiEndPoint + '/users';
  }

  create(model: UserDTO): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(this.apiAddress, model)
  }

  getAll(filters: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiAddress}/${filters}`);
  }

  get(id: string, expands?: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiAddress}/${id}` + (expands ? `?Expands=${expands}` : ''));
  }

  changePasswordByEmail(model: ChangePasswordByEmailDTO) {
    return this.http.patch(this.apiAddress + '/changepasswordbyemail', model);
  }

  changePasswordByPhone(model: ChangePasswordByPhoneDTO) {
    return this.http.patch(this.apiAddress + '/changepasswordbycellphone', model);
  }

  checkUsernamePossession(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiAddress}/checkusername/${username}`);
  }
}
