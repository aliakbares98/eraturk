import { Direction } from "@angular/cdk/bidi";
import { DIRECTION } from "../data/direction.data";

export let themeSettings: ThemeSettings = {
    direction: DIRECTION.ltr
};

export interface ThemeSettings {
    direction: Direction
}