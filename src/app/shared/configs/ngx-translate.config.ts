import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModuleConfig } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CustomTranslateLoader } from "../client-services/custom-translator-loader.service";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export let translateConfig: TranslateModuleConfig = {
    loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
    }
}
