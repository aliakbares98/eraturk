import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OTP_SCENARIO } from 'src/app/modules/authentication/data/otp.senarios.data';
import { OtpDTO, OtpViewDto } from 'src/app/modules/authentication/dto';
import { OtpService } from 'src/app/modules/authentication/services/otp.service';

@Component({
  selector: 'era-confirmation-code',
  templateUrl: './confirmation-code.component.html',
  styleUrls: ['./confirmation-code.component.scss']
})
export class ConfirmationCodeComponent implements OnInit {
  @Input('form') form: FormGroup;
  @Output('onCodeEntered') onCodeEntered: EventEmitter<string>

  constructor(public orpService: OtpService, private fb: FormBuilder, private otpService: OtpService) { }

  ngOnInit(): void {
  }

  requestOtpCodeCellphone() {
    let otpDto: OtpDTO = {
      key: this.form.controls.value.value,
      scenario: OTP_SCENARIO.confirmEmail,
      captcha: 'S'
    };

    this.otpService.otp(otpDto).subscribe();
  }
}
