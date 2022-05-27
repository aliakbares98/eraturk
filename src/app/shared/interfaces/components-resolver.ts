import { ComponentType } from "@angular/cdk/portal";

export interface ComponentsResolver {
    add: () => ComponentType<any> | null;
    edit: () => ComponentType<any> | null;
}