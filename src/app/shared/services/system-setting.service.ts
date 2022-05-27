import { SystemSettingDTO } from '../dto/system-setting.dto';
import { BaseService } from 'src/app/shared/services';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingService extends BaseService<SystemSettingDTO> {

  constructor(public injector: Injector) {
    super('systemSettings', injector)
  }

}
