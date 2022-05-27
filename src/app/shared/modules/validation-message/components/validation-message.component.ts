import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
@Component({
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {
    constructor(private cdr: ChangeDetectorRef) { }

    validationMessage: string = '';
    hide = true;

    @Input() set text(value: string) {
        if (value !== this.validationMessage) {
            this.validationMessage = value;
            this.hide = !Boolean(value);
            this.cdr.detectChanges();
        }
    };
}