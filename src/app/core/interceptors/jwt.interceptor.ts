import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { RefreshTokenDTO } from 'src/app/modules/authentication/dto';
import { StorageService } from 'src/app/shared/client-services/storage.service';
import { RefreshTokenDecisionEnum } from 'src/app/shared/enums/refresh-token-decision.enum';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AccountService,
    private tokenService: StorageService,
    private router: Router) { }

  isRefreshing = false;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.tokenService.getAccessToken();
    if (token) {
      let cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });

      switch (this.authService.whatDecesionForRefreshToken()) {
        case RefreshTokenDecisionEnum.noNeed:
          return next.handle(cloned);

        case RefreshTokenDecisionEnum.needAsynchronously:
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenAsyncronously();
          }
          return next.handle(cloned);

        case RefreshTokenDecisionEnum.needSynchronously:
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSyncronously();
            console.log('After calling refresh-token synchronously')
            this.isRefreshing = false;
          }
          return next.handle(cloned);

        case RefreshTokenDecisionEnum.logout:
          this.tokenService.clearTokens();
          this.router.navigate(['/login']);
          return EMPTY;
      }
    } else {
      return next.handle(request);
    }
  }

  refreshTokenAsyncronously(): void {
    console.log('refresh-token asynchronously started')
    this.authService.refreshToken(this.createTokenModel()).then(result => {
      this.isRefreshing = false;
      console.log('refresh-token asynchronously finished');
    });
  }

  async refreshTokenSyncronously(): Promise<any> {
    // console.log('refresh-token synchronously started')
    await this.authService.refreshToken(this.createTokenModel()).then(result => {
      console.log('refresh-token synchronously finished');
    });
  }

  createTokenModel(): RefreshTokenDTO {
    return {
      refreshToken: <string>this.tokenService.getRefreshToken()
    };
  }
}
