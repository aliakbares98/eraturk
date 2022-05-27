import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";

export class FormUtilities {
    static observeOnInput<T>(list: T[], auxiliaryInput: AbstractControl, mainInput: AbstractControl, mainInputValueProperty: string, filterProperty: string): Observable<T[]> {

        return auxiliaryInput.valueChanges
            .pipe(
                startWith(''),
                tap(value => {
                    if (typeof value !== 'string') {
                        mainInput.setValue((value as any)[mainInputValueProperty]);
                    }
                }),
                map(value => typeof value === 'string' ? value : (value as any)[filterProperty]),
                map(value => this.filterNationality<T>(list, value, filterProperty))
            );
    }

    private static filterNationality<T>(list: T[], value: string, filterProperty: string): T[] {
        const filterValue = value.toLowerCase();

        return list.filter((entity: T) => (entity as any)[filterProperty].toLowerCase().includes(filterValue.toLowerCase().trim()));
    }
}
