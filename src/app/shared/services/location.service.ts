import { Injectable, Injector } from "@angular/core";
import { LocationDTO } from "../dto";
import { BaseService } from "./_base.service";

@Injectable({
    providedIn: 'root'
})
export class LocationService extends BaseService<LocationDTO> { 
    constructor(public injector: Injector) { 
        super('locations', injector);
    }
}