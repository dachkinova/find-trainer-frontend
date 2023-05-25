import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, empty, of, throwError} from 'rxjs';
import {AuthService} from "../../../../service/auth.service";
import {StorageService} from "../../../../service/storage.service";
import {AppComponent} from "../../../app.component";
import {SuccessfulDialogComponent} from "../../common/successful-dialog/successful-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: 'change-password-page',
    templateUrl: './change-password-page.component.html',
    styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {
    currentUser: any;
    formData: any;
    passwordChanged = false;
    changePasswordForm!: FormGroup;
    errorMessage = false;


    get oldPassword() {
        return this.changePasswordForm.get('oldPassword');
    }

    get newPassword() {
        return this.changePasswordForm.get('newPassword');
    }

    form: any = {
        oldPassword: null,
        newPassword: null
    };

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private storageService: StorageService,
        public component: AppComponent,
        private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required]
        });
    }

    changePassword(): void {
        // if (this.changePasswordForm.invalid) {
        //     return;
        // }
        let id = this.currentUser.id;
        const oldPassword = this.changePasswordForm.value.oldPassword;
        const newPassword = this.changePasswordForm.value.newPassword;
        this.authService.changePassword(id, oldPassword, newPassword).pipe(
            catchError(error => {
                console.log(error);
                this.errorMessage = true;
                return throwError(error);
            }))
            .subscribe(data => {
                this.passwordChanged = true;
                this.storageService.clean();
                const dialogRef = this.dialog.open(SuccessfulDialogComponent, {
                    data: {
                        message: 'Паролата е сменена успешно!',
                    }
                });
                dialogRef.afterClosed().subscribe(result => {
                    this.router.navigateByUrl('/login');
                });
            });

    }

    reloadPage(): void {
        window.location.reload();
    }

}
