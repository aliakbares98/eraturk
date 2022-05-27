import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import { from, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CultureViewDTO } from "../dto";
import { culturesList } from "../global-variables/cultures.global-variable";

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
    contentHeader = new HttpHeaders({
        'Content-Type': '',
        'Access-Control-Allow-Origin': '*',
    });

    constructor(private httpClient: HttpClient) { }

    getTranslation(lang: string): Observable<any> {
        return from(this.getCultures(lang));
    }

    async getCultures(lang: string): Promise<any> {
        let translationFileId = (culturesList.data.find(c => c.name === lang) as CultureViewDTO).translationFileId;
        return await this.httpClient.get(environment.apiEndPoint + `/documents/${translationFileId}`).pipe(
            map(result => {
                return JSON.parse((result as any).fileContent);
            }),
            catchError(_ => this.httpClient.get(`/assets/i18n/en.json`))
        ).toPromise();
    }
}
