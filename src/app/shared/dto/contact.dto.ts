
interface ContactBase {
    type: string;
    description: string;
}
export interface CellPhoneContactDTO extends ContactBase {
    value: string;
    otp: string;
}

export interface EmailContactDTO extends ContactBase {
    value: string;
    otp: string;
}

export interface PhoneContactDTO extends ContactBase {
    value: string;
}

export interface PhysicalAddressContactDTO extends ContactBase {
    value: PhysicalAddressDto;
}

export interface PhysicalAddressDto {
    title: string;
    line1: string;
    line2: string;
    postalCode: string;
    city: string;
    coordinate: number[];
}

export interface SocialIdContactDTO extends ContactBase {
    value: IdentityData;
}

export interface IdentityData {
    id: string;
    code: string;
}

export interface WebsiteContactDTO extends ContactBase {
    value: string;
}