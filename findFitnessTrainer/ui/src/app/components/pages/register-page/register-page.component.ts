import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import {empty, throwError} from 'rxjs';
import { AuthService } from "../../../../service/auth.service";
import {ConfirmationDialogComponent} from "../../common/confirmation-dialog/confirmation-dialog.component";
import {SuccessfulDialogComponent} from "../../common/successful-dialog/successful-dialog.component";
import { MatDialog } from '@angular/material/dialog';


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
    errorMessage: string = '';

    get email() {
        return this.formData.get('email');
    }

    get password() {
        return this.formData.get('password');
    }

    get firstName() {
        return this.formData.get('firstName');
    }

    get username() {
        return this.formData.get('username');
    }

    get lastName() {
        return this.formData.get('lastName');
    }

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
        this.showError = false;
    }

    toProfile() {
        this.authService
            .registration(
                this.formData.controls.username.value,
                this.formData.controls.firstName.value,
                this.formData.controls.lastName.value,
                this.formData.controls.email.value,
                this.formData.controls.password.value,
                this.typeOfProfile
            )
            .pipe(
                catchError(error => {
                    console.log(error);
                    this.errorMessage = error.error.message; // Assign error message to the variable
                    return throwError(error);
                })
            )
            .subscribe(
                data => {
                    const dialogRef = this.dialog.open(SuccessfulDialogComponent, {
                        data: {
                            message: 'Регистрацията е успешна!',
                        },
                    });

                    dialogRef.componentInstance.okClick.subscribe(() => {
                        this.router.navigateByUrl('/login');
                    });
                },
                error => {
                    console.log('An error occurred:', error);
                }
            );
    }

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
}
