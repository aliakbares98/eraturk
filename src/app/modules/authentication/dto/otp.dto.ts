interface OtpBase {
    key: string;
    captcha: string;
}

export interface OtpDTO extends OtpBase { 
    scenario: string;
};

export interface OtpViewDto extends OtpBase {
    id: string;
    otp: number;
}