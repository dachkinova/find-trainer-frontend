import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, empty, of, throwError} from 'rxjs';
import {AuthService} from "../../../../service/auth.service";

@Component({
    selector: 'register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    formData: any;
    showError: any;
    isSuccessful = false;
    isSignUpFailed = false;
    typeOfProfile = false;
    loginError: any;

    get email() {
        return this.formData.get('email');
    }

    get password() {
        return this.formData.get('password');
    }

    get firstName() {
        return this.formData.get('firstName');
    }

    get lastName() {
        return this.formData.get('lastName');
    }

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService) {
    }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl('')
        });

        this.showError = false;
    }

    toProfile() {
        this.authService.registration(this.formData.controls.firstName.value,
            this.formData.controls.lastName.value,
            this.formData.controls.email.value,
            this.formData.controls.password.value, this.typeOfProfile)
            .pipe(catchError(error => {
                if (error.status === 400) {
                    console.log(error)
                }
                return throwError(error);
            }))
            .subscribe(data => {
                    console.log(data)
                    this.isSuccessful = true;
                    this.isSignUpFailed = false;
                    this.router.navigateByUrl('/login').then(r => this.reloadPage())
                }
            )
    };

    reloadPage(): void {
        window.location.reload();
    }

    changeTypeOfProfile(e: any) {
        if (e.target.value == 'client') {
            this.typeOfProfile = false;
        } else if (e.target.value == 'trainer') {
            this.typeOfProfile = true;
        }
        console.log(e.target.value);
    }

    // toProfile() {
    //     this.authService.registration(this.formData.controls.firstName.value, this.formData.controls.lastName.value,
    //         this.formData.controls.email.value, this.formData.controls.password.value)
    //         .pipe(
    //             catchError(error => {
    //                 this.showError = true
    //                 this.isSignUpFailed = true;
    //                 return empty();
    //             })
    //         )
    //         .subscribe(res =>{ this.router.navigateByUrl('/login') }
    //         );
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    // };

}
