import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ability, AbilityBuilder } from '@casl/ability';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { REFRESH_TOKEN_REQUEST_TIME_LIMIT } from 'src/app/core/settings/app.settings';
import { UserResultDTO } from 'src/app/shared/dto';
import { RefreshTokenDecisionEnum } from 'src/app/shared/enums/refresh-token-decision.enum';
import { tokenRemainingTime } from 'src/app/shared/global-variables/token-time-variable';
import { NumberUtility } from 'src/app/shared/utilities';
import { environment } from 'src/environments/environment';
import {
  LoginDTO,
  LoginResultDTO,
  RefreshTokenDTO,
  RefreshTokenResultDTO
} from '../../modules/authentication/dto';
import { LogoutViewDTO } from '../../modules/authentication/dto/logout.dto';
import { StorageService } from '../client-services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiAddress: string = '';
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private ability: Ability,
    private router: Router) {
    this.apiAddress = environment.apiEndPoint + '/account';
  }

    login(model: LoginDTO): Observable<LoginResultDTO> {
    return this.http.post<LoginResultDTO>(this.apiAddress + '/login', model).pipe(
      tap((result: LoginResultDTO) => {
        this.storageService.storeTokens(result);
        this.updateAbilities();
        this.initTokenExpireTimeManagement();
      }));
  }

  updateAbilities() {
    const { can, rules } = new AbilityBuilder<Ability>(Ability);

    let actionTypes = this.storageService.getActionTypes();
    if (actionTypes) {
      actionTypes.forEach((action: string) => {
        can(action, '');
      });
      can('AllowedTemporarily','');

      this.ability.update(rules);
    } else {
      this.ability.update([]);
    }
  }

  logout(): Observable<LogoutViewDTO> {
    return this.http.post<LogoutViewDTO>(this.apiAddress + '/logout', null).pipe(
      tap(result => {
        this.storageService.clearTokens();
        this.router.navigate(['/']);
      }));
  }

  getUser(): Observable<UserResultDTO> {
    return this.http.get<UserResultDTO>(this.apiAddress + '/user');
  }

  refreshToken(model: RefreshTokenDTO): Promise<RefreshTokenResultDTO> {
    return this.http.post<RefreshTokenResultDTO>(this.apiAddress + '/refresh-token', model).pipe(
      tap((result: RefreshTokenResultDTO) => {
        this.storageService.storeTokens(result);
        this.initTokenExpireTimeManagement();
      })).toPromise();
  }

  isLoggedIn(): boolean {
    return this.storageService.getAccessToken() !== null;
  }

  /**
   * Token expiration time management
   */
  accessTokenValue: string | null;
  accessTokenStoreTime: number;
  accessTokenPeriod: number;
  refreshTokenValue: string | null;
  refreshTokenStoreTime: number;
  refreshTokenPeriod: number;

  accessTokenTimer$: Observable<number>;
  accessTokenTimeUnsubscriber: Subscription;
  refreshTokenTimer$: Observable<number>;
  refreshTokenTimeUnsubscriber: Subscription;

  initTokenExpireTimeManagement(): void {
    this.accessTokenValue = this.storageService.getAccessToken();
    this.accessTokenPeriod = this.storageService.getAccessTokenPeriod();
    this.accessTokenStoreTime = this.storageService.getAccessTokenStoreTime();

    this.refreshTokenValue = this.storageService.getRefreshToken();
    this.refreshTokenPeriod = this.storageService.getRefreshTokenPeriod();
    this.refreshTokenStoreTime = this.storageService.getRefreshTokenStoreTime();

    if (this.hasToken()) {
      this.checkAccessTokenExpireTime();
      this.checkRefreshTokenExpireTime();
    } else {
      tokenRemainingTime.reset();
    }
  }

  private hasToken(): boolean {
    return Boolean(this.accessTokenValue && this.accessTokenPeriod && this.accessTokenStoreTime
      && this.refreshTokenValue && this.refreshTokenPeriod && this.refreshTokenStoreTime);
  }

  private checkAccessTokenExpireTime(): void {
    if (this.accessTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.accessTokenStoreTime;

      if (spentTime < this.accessTokenPeriod) {
        let remainingTime = this.accessTokenPeriod - spentTime;
        this.setTimerForAccessToken(remainingTime);
      } else {
        tokenRemainingTime.resetAccessTokenTime();
      }
    }
  }

  private checkRefreshTokenExpireTime(): void {
    if (this.refreshTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.refreshTokenStoreTime;

      if (spentTime < this.refreshTokenPeriod) {
        let remainingTime = this.refreshTokenPeriod - spentTime;
        this.setTimerForRefreshToken(remainingTime);
      } else {
        tokenRemainingTime.resetRefreshTokenTime();
      }
    }
  }

  private setTimerForAccessToken(time: number): void {
    if (this.accessTokenTimeUnsubscriber) {
      this.accessTokenTimeUnsubscriber.unsubscribe();
    }
    // A downCounter for AccessToken remaining time
    let timeInSecond = Math.floor(time / 1000);
    tokenRemainingTime.data.accessTokenTime = timeInSecond;
    this.accessTokenTimer$ = NumberUtility.countDown(timeInSecond - 1);
    this.accessTokenTimeUnsubscriber = this.accessTokenTimer$.subscribe((num: number) => {
      tokenRemainingTime.data.accessTokenTime = num;
    });
  }

  private setTimerForRefreshToken(time: number): void {
    if (this.refreshTokenTimeUnsubscriber) {
      this.refreshTokenTimeUnsubscriber.unsubscribe();
    }
    // A downCounter for RefreshToken remaining time
    let timeInSecond = Math.floor(time / 1000);
    tokenRemainingTime.data.refreshTokenTime = timeInSecond;
    this.refreshTokenTimer$ = NumberUtility.countDown(timeInSecond);
    this.refreshTokenTimeUnsubscriber = this.refreshTokenTimer$.subscribe((num: number) => {
      tokenRemainingTime.data.refreshTokenTime = num;
    });
  }

  whatDecesionForRefreshToken(): RefreshTokenDecisionEnum {
    let accessTokenTimeInSecond = this.accessTokenPeriod / 1000;
    let decision: RefreshTokenDecisionEnum;
    if (tokenRemainingTime.data.accessTokenTime > (accessTokenTimeInSecond * REFRESH_TOKEN_REQUEST_TIME_LIMIT.max)) {
      decision = RefreshTokenDecisionEnum.noNeed;
    } else if (tokenRemainingTime.data.accessTokenTime > (accessTokenTimeInSecond * REFRESH_TOKEN_REQUEST_TIME_LIMIT.min) &&
      tokenRemainingTime.data.accessTokenTime < (accessTokenTimeInSecond * REFRESH_TOKEN_REQUEST_TIME_LIMIT.max)) {
      decision = RefreshTokenDecisionEnum.needAsynchronously;
    } else {
      if (tokenRemainingTime.data.refreshTokenTime > 0) {
        decision = RefreshTokenDecisionEnum.needSynchronously;
      } else {
        decision = RefreshTokenDecisionEnum.logout;
      }
    }

    // console.log('Access Token Remaining Time : ' + tokenRemainingTime.data.accessTokenTime);
    // console.log('Refresh Token Remaining Time : ' + tokenRemainingTime.data.refreshTokenTime);
    // console.warn('==========');
    return decision;
  }
}
