export interface RefreshTokenDTO { 
    refreshToken: string;
}

export interface RefreshTokenResultDTO { 
    actionTypes: string[];
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiration: 0;
    accessTokenExpiration: 0;
}