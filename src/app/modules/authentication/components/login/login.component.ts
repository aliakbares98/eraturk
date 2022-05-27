import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/client-services';
import { registerModelVariable } from 'src/app/shared/global-variables';
import { cellphoneOtp, emailOtp, otpModelVariable } from 'src/app/shared/global-variables/otp.global-variable';
import { AccountService } from '../../../../shared/services/account.service';
import { LoginResultDTO } from '../../dto';

@Component({
  selector: 'era-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AccountService,
    private router: Router,
    private notification: NotificationService) { }

  form: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, [Validators.required]]
  });

  loading = false;
  ngOnInit(): void {
    registerModelVariable.reset();
    otpModelVariable.reset();
    cellphoneOtp.reset();
    emailOtp.reset();
  }

  login(): void {
    this.loading = true;
    this.notification.clear();
    this.authService.login(this.form.value).subscribe((result: LoginResultDTO) => {
      if (result.accessToken) {
        this.router.navigate(['/']);
      }
    }, error => {
      this.loading = false;
    });
  }
}
