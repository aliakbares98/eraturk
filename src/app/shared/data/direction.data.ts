import { Direction } from "@angular/cdk/bidi";

export const DIRECTION: ThemeDirection = {
    ltr: 'ltr',
    rtl: 'rtl'
}

export interface ThemeDirection {
    ltr: Direction,
    rtl: Direction
}