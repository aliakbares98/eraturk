import { party } from "../data";
import { DocumentViewDTO } from "./document.dto";

export interface ProductBrandDTO {
    id: string;
    name: string;
    description: string;
    partyId: string;
    logoDocumentId: string;
}

export interface ProductBrandViewDTO extends ProductBrandDTO {
    party: party;
    logoDocument: DocumentViewDTO;
}