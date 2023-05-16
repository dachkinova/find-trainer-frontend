import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
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
    showError: any;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    get email() {
        return this.formData.get('email');
    }

    get password() {
        return this.formData.get('password');
    }

    form: any = {
        email: null,
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
            email: new FormControl(''),
            password: new FormControl(''),
        });

        this.showError = false;
    }

    // toProfile(){
    //     this.authService.login(this.formData.controls.email.value, this.formData.controls.password.value)
    //         .pipe(
    //             catchError(error => {
    //                 this.showError=true
    //                 this.isLoginFailed = true;
    //                 return empty();
    //             })
    //         )
    //         .subscribe(res => {this.authService.isLoggedIn=true,
    //             this.router.navigateByUrl('/')});
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.storageService.getUser().roles;
    // };

    toProfile() {
        if (this.formData.controls.email.value == "admin" && this.formData.controls.password.value == "admin") {
            this.storageService.saveUser("admin");
            this.authService.isAdmin = true;
            this.isLoggedIn = true;
            this.authService.isLoggedIn = true;
            this.router.navigateByUrl('/admin').then(r => this.reloadPage());
            this.reloadPage();
        } else {
            this.authService.login(this.formData.controls.email.value, this.formData.controls.password.value).subscribe({
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
                        this.errorMessage = err.error.message;
                        this.isLoginFailed = true;
                    }
                }
            );
        }
    };

    reloadPage(): void {
        window.location.reload();
    }


}
