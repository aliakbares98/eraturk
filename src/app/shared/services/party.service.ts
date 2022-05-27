import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { CommandResponseDTO, IndividualPartyDTO, OrganizationPartyDTO } from "../dto";
import { BaseService } from "./_base.service";

@Injectable({
    providedIn: 'root'
})
export class PartyService extends BaseService<IndividualPartyDTO | OrganizationPartyDTO> {
    constructor(public injector: Injector) {
        super('parties', injector);
    }

    createIndividualParty(model: IndividualPartyDTO): Observable<CommandResponseDTO> {
        return this.http.post<CommandResponseDTO>(`${this.apiAddress}/IndividualParty`, model);
    }

    updateIndividualParty(model: IndividualPartyDTO): Observable<CommandResponseDTO> {
        return this.http.put<CommandResponseDTO>(`${this.apiAddress}/IndividualParty/${model.id}`, model);
    }

    createOrganizationParty(model: OrganizationPartyDTO): Observable<CommandResponseDTO> {
        return this.http.post<CommandResponseDTO>(`${this.apiAddress}/OrganizationParty`, model);
    }

    updateOrganizationParty(model: OrganizationPartyDTO): Observable<CommandResponseDTO> {
        return this.http.put<CommandResponseDTO>(`${this.apiAddress}/OrganizationParty/${model.id}`, model);
    }
}
