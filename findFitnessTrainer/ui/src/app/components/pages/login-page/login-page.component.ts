import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, empty, of} from 'rxjs';
import {AuthService} from "../../../../service/auth.service";
import {StorageService} from "../../../../service/storage.service";
import {AppComponent} from "../../../app.component";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    formData: any;
    showError: boolean = false;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    get username() {
        return this.formData.get('username');
    }

    get password() {
        return this.formData.get('password');
    }

    form: any = {
        username: null,
        password: null
    };

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private storageService: StorageService,
        public component: AppComponent) {
    }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });

        this.showError = false;
    }

    toProfile() {
        if (this.formData.controls.username.value == "admin") {
            this.authService.login(this.formData.controls.username.value, this.formData.controls.password.value).subscribe({
                    next: data => {
                        this.storageService.saveUser(data);
                        this.isLoginFailed = false;
                        this.isLoggedIn = true;
                        this.roles = this.storageService.getUser().roles;
                        this.authService.isLoggedIn = true;
                        this.router.navigateByUrl('/admin').then(r => this.reloadPage())
                        this.reloadPage();
                    },
                    error: err => {
                        this.errorMessage = "Invalid username or password. Please check your credentials.";
                        this.isLoginFailed = true;
                        this.showError = true;
                    }
                }
            );
        } else {
            this.authService.login(this.formData.controls.username.value, this.formData.controls.password.value).subscribe({
                    next: data => {
                        this.storageService.saveUser(data);
                        this.isLoginFailed = false;
                        this.isLoggedIn = true;
                        this.roles = this.storageService.getUser().roles;
                        this.authService.isLoggedIn = true;
                        this.router.navigateByUrl('/job-listings').then(r => this.reloadPage())
                        this.reloadPage();
                    },
                error: err => {
                    this.errorMessage = "Invalid username or password. Please check your credentials.";
                    this.isLoginFailed = true;
                    this.showError = true;
                }
                }
            );
        }
    };

    reloadPage(): void {
        window.location.reload();
    }


}
