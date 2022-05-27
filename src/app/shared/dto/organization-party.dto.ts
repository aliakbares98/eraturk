import { contact } from "../data";

export interface OrganizationPartyDTO {
    id: string;
    contacts: contact[];
    nationality: string;
    description: string;
    companyType: string;
    name: string;
    registerDate: string;
}

export interface OrganizationPartyViewDTO extends OrganizationPartyDTO {
    subType: string;
}