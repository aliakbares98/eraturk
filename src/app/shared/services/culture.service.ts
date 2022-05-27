import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../client-services';
import { CommandResponseDTO, CultureDTO, CultureViewDTO, ListViewDTO } from '../dto';
import { culturesList } from '../global-variables/cultures.global-variable';
import { SearchParams } from '../models';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class CultureService extends BaseService<CultureDTO> {

  constructor(private translate: TranslateService,
    private storageService: StorageService,
    public injector: Injector) {
    super('cultures', injector);
  }

  getAll<returnType>(filters: string): Observable<ListViewDTO<returnType>> {
    return super.getAll<returnType>(filters).pipe(
      tap(result => {
        culturesList.data = <any>result.items;
      })
    );
  }

  getAllSync<returnType>(filters: string): Promise<ListViewDTO<returnType>> {
    return super.getAll<returnType>(filters).pipe(
      tap(result => {
        culturesList.data = <any>result.items;
      })
    ).toPromise();
  }

  setApplicationCulture() {
    this.getAll<CultureViewDTO>(new SearchParams().stringify()).subscribe(result => {
      this.translate.setDefaultLang('en');

      let browserLang = this.translate.getBrowserLang();
      let selectedLang = this.storageService.getSelectedLanguage();
      let browserLanguageIsSupported = result.items.find(c => c.name === browserLang) !== undefined;

      let appLang = selectedLang ? selectedLang : (browserLanguageIsSupported ? browserLang : 'en');
      this.translate.use(appLang);
    })
  }
  
  // async setApplicationCulture() {
  //   await this.getAllSync<CultureViewDTO>(new SearchParams().stringify()).then(result => {
  //     this.translate.setDefaultLang('en');

  //     let browserLang = this.translate.getBrowserLang();
  //     let selectedLang = this.storageService.getSelectedLanguage();
  //     let browserLanguageIsSupported = result.items.find(c => c.name === browserLang) !== undefined;

  //     let appLang = selectedLang ? selectedLang : (browserLanguageIsSupported ? browserLang : 'en');
  //     this.translate.use(appLang);
  //   })
  // }

  create(model: any): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(this.apiAddress, model);
  }

  updateWithFormData(model: FormData, id: string): Observable<CommandResponseDTO> {
    return this.http.patch<CommandResponseDTO>(`${this.apiAddress}/${id}`, model);
  }
}
