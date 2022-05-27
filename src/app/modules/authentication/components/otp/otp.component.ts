import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OTP_CODE_LENGTH, OTP_EXPIRATION_TIME } from 'src/app/core/settings/app.settings';
import { OTP_SCENARIO } from 'src/app/modules/authentication/data/otp.senarios.data';
import { NotificationService } from 'src/app/shared/client-services/notification.service';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { cellphoneOtp, emailOtp, otpModelVariable, registerModelVariable } from 'src/app/shared/global-variables';
import { UserService } from 'src/app/shared/services';
import { NumberUtility } from 'src/app/shared/utilities';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'era-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder,
    private otpService: OtpService,
    private userService: UserService,
    private router: Router,
    private notifService: NotificationService) { }

  otpCodeLenght: number = OTP_CODE_LENGTH;
  form: FormGroup = this.fb.group({
    cellphoneOtp: [null, [Validators.required]],
    emailOtp: [null],
  });

  time: Observable<number> = new Observable();
  loading = false;
  ngOnInit(): void {
    this.startCountDownTimer();

    this.time.subscribe((number: number) => {
      if (number === 0) {
        cellphoneOtp.reset();
        emailOtp.reset();
      }
    });
  }

  // Temporary for demo
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fillcellphoneOtpInput();
      this.fillEmailOtpInput();
    });
  }

  // Temporary for demo
  fillcellphoneOtpInput(): void {
    this.form.controls.cellphoneOtp.setValue(cellphoneOtp.data.code);
  }

  // Temporary for demo
  fillEmailOtpInput(): void {
    this.form.controls.emailOtp.setValue(emailOtp.data.code);
  }

  startCountDownTimer(): void {
    this.time = NumberUtility.countDown(OTP_EXPIRATION_TIME);
  }

  callCellphoneOtp(): void {
    this.loading = true;
    otpModelVariable.reset();

    otpModelVariable.fill(registerModelVariable.data.cellPhone, OTP_SCENARIO.confirmCellPhone, 'S');
    this.otpService.otp(otpModelVariable.data).subscribe((result: any) => {
      if (result.id) {
        cellphoneOtp.data.code = result.otp;
        this.fillcellphoneOtpInput();

        if (registerModelVariable.data.email !== '') {
          this.callEmailOtp();
        } else {
          this.loading = false;
          this.startCountDownTimer();
        }
      }
    }, error => {
      this.loading = false;
    });
  }

  callEmailOtp(): void {
    otpModelVariable.fill(registerModelVariable.data.email, OTP_SCENARIO.confirmEmail, 'S');
    this.otpService.otp(otpModelVariable.data).subscribe((result: any) => {
      if (result.id) {
        emailOtp.data.code = result.otp;
        this.fillEmailOtpInput();
        this.startCountDownTimer();
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

  get emailIsFilled(): boolean {
    return registerModelVariable.data.email !== '';
  }

  finishRegister(): void {
    this.loading = true;
    if (this.otpCodesAreValid()) {
      this.fillRegisterModelStepTwo();

      this.userService.create(registerModelVariable.data).subscribe((result: CommandResponseDTO) => {
        if (result.id) {
          /**
           * Reset all global varibles
           */
          registerModelVariable.reset();
          otpModelVariable.reset();
          cellphoneOtp.reset();
          emailOtp.reset();

          this.notifService.showSuccess('You registered successfully!');
          this.router.navigate(['/login']);
        }
      }, error => {
        this.loading = false;
      });
    } else {
      this.showMessageForInvalidCode();
    }
  }

  otpCodesAreValid(): boolean {
    if (+this.form.controls.emailOtp.value) {
      return (+this.form.controls.emailOtp.value === emailOtp.data.code) &&
        (+this.form.controls.cellphoneOtp.value === cellphoneOtp.data.code);
    } else {
      return +this.form.controls.cellphoneOtp.value === cellphoneOtp.data.code;
    }
  }

  showMessageForInvalidCode(): void {
    if (this.form.controls.cellphoneOtp.value !== cellphoneOtp.data.code) {
      this.notifService.showError('Entered phone code is not valid');
    }
    if (this.form.controls.emailOtp.value !== emailOtp.data.code) {
      this.notifService.showError('Entered email code is not valid');
    }
  }

  fillRegisterModelStepTwo(): void {
    if (+this.form.controls.emailOtp.value) {
      registerModelVariable.fillStepTwo(+this.form.controls.cellphoneOtp.value, +this.form.controls.emailOtp.value);
    } else {
      registerModelVariable.fillStepTwo(+this.form.controls.cellphoneOtp.value);
    }
  }
}
