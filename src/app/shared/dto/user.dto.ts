export interface UserDTO {
    captcha: string;
    userName: string;
    password: string;
    passwordConfirm: string;
    email: string;
    cellPhone: string;
    emailOtp: number;
    cellPhoneOtp: number;
    roles: string[];
}

export interface UserViewDTO {
    id: string;
    userName: string;
    email: string;
    cellPhone: string;
    roles: string[];

    
}