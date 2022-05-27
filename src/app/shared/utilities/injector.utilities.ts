import { Injector } from "@angular/core";
import { Subject } from "rxjs";

export class AppInjector {
    private static injector: any;

    static onInjectorFill: Subject<boolean> = new Subject();

    static setInjector(_injector: Injector) {
        this.injector = _injector;
        this.onInjectorFill.next(true);
    }

    static getInjector() {
        return this.injector;
    }

    static injectorIsReady(): boolean {
        return this.injector !== undefined;
    }
}