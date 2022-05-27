import { UserDTO } from "../dto/user.dto";

interface otpModelManagement {
    data: UserDTO;
    fillStepOne: Function;
    fillStepTwo: Function;
    isFilled: Function;
    reset: Function;
}
/**
 * @description A global variable to hold registeration form's info on RAM
 * @description reason : we fill registerModel data in two pages (steps), so we need to keep data on RAM
 */
export let registerModelVariable: otpModelManagement = {
    data: {
        captcha: '',
        userName: '',
        password: '',
        passwordConfirm: '',
        email: '',
        cellPhone: '',
        emailOtp: 0,
        cellPhoneOtp: 0,
        roles: []
    },
    fillStepOne(form: UserDTO): void {
        // there is no captha yet
        this.data.captcha = 'S';
        this.data.userName = form.userName;
        this.data.password = form.password;
        this.data.passwordConfirm = form.passwordConfirm;
        this.data.cellPhone = form.cellPhone;
        this.data.email = form.email;
        // reset otp codes to 0
        this.data.emailOtp = 0;
        this.data.cellPhoneOtp = 0;
        this.data.roles = form.roles;
    },
    fillStepTwo(cellphoneOtp: number, emailOtp?: number): void {
        this.data.cellPhoneOtp = cellphoneOtp;

        if (emailOtp) {
            this.data.emailOtp = emailOtp;
        } else {
            this.data.email = '';
        }
    },
    isFilled(): boolean {
        return this.data.userName !== '';
    },
    reset(): void {
        this.data.captcha = '';
        this.data.userName = '';
        this.data.password = '';
        this.data.passwordConfirm = '';
        this.data.email = '';
        this.data.cellPhone = '';
        this.data.emailOtp = 0;
        this.data.cellPhoneOtp = 0;
        this.data.roles = [];
    }
}
