import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserObjectsService {

  constructor() { }

  windowRef(): Window {
    return window;
  }
}
