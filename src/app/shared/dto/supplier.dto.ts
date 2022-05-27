import { IndividualPartyDTO } from "./individual-party.dto";

interface SupplierBase {
    id: string;
    name: string;
    description: string;
}

export interface SupplierDTO extends SupplierBase {
    partyId: string;
}

export class SupplierViewDTO {
    id: string;
    name: string;
    description: string;
    party: IndividualPartyDTO;
}
