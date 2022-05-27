import { BidiModule } from '@angular/cdk/bidi';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Ability, PureAbility } from '@casl/ability';
import { AbilityModule } from '@casl/angular';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgProgressModule } from 'ngx-progressbar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor, ProgressBarInterceptor } from './core/interceptors';
import { TokenInterceptor } from './core/interceptors/jwt.interceptor';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { HeaderMobileComponent } from './layouts/components/header-mobile/header-mobile.component';
import { HeaderComponent } from './layouts/components/header/header.component';
import { MenuComponent } from './layouts/components/menu/menu.component';
import { SideMenuComponent } from './layouts/components/side-menu/side-menu.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { ProfileLayoutComponent } from './layouts/profile/profile-layout.component';
import { OtpService } from './modules/authentication/services/otp.service';
import { VideoDetailsModule } from './modules/video-details/video-details.module';
import { FilterComponent } from './shared/components/filter-component/filter.component';
import { translateConfig } from './shared/configs/ngx-translate.config';
import { ValidationMessageModule } from './shared/modules';
import { CultureService } from './shared/services';
import { AccountService } from './shared/services/account.service';

export function refreshTokenInitializerFactory(authService: AccountService) {
  return () => {
    return authService.initTokenExpireTimeManagement();
  }
}

export function updateAbilitiesInitializerFactory(authService: AccountService) {
  return () => {
    return authService.updateAbilities();
  }
}

export function setApplicationCultureFactory(cultureService: CultureService) {
  return () => {
    return cultureService.setApplicationCulture();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ProfileLayoutComponent,
    MainLayoutComponent,
    HeaderComponent,
    HeaderMobileComponent,
    FooterComponent,
    SideMenuComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    BidiModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    TranslateModule.forRoot(translateConfig),
    NgProgressModule.withConfig({
      color: '#008542',
      thick: true,
      spinner: false,
    }),
    SnotifyModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AbilityModule,
    StoreModule.forRoot({}, {}),
    VideoDetailsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: refreshTokenInitializerFactory, deps: [AccountService], multi: true },
    { provide: APP_INITIALIZER, useFactory: setApplicationCultureFactory, deps: [CultureService], multi: true },
    { provide: APP_INITIALIZER, useFactory: updateAbilitiesInitializerFactory, deps: [AccountService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability },
    SnotifyService,
    OtpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
