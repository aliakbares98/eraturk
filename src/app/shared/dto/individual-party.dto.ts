import { contact } from "../data";

export interface IndividualPartyDTO {
    id: string;
    contacts: contact[];
    nationality: string;
    description: string;
    gender: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}

export interface IndividualPartyViewDTO extends IndividualPartyDTO{
    subType: string;
 }