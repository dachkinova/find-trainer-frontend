import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../service/storage.service";
import {TrainerService} from "../../../../service/trainer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Validators} from "ngx-editor";
import {AuthService} from "../../../../service/auth.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
    selector: 'app-company-details-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

    currentUser: any;
    currentTrainerInfo: any;
    changePasswordForm!: FormGroup;
    showChangePasswordForm = false;
    passwordChanged = false;


    constructor(public storageService: StorageService, public trainerService: TrainerService, private formBuilder: FormBuilder, public authService: AuthService) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        this.trainerService.getTrainerInfoById(this.currentUser.id).subscribe(result => {
            console.log(result);
            this.currentTrainerInfo = result;
        });
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required]
        });
    }

    changePassword(): void {
        if (this.changePasswordForm.invalid) {
            return;
        }
        let id = this.currentUser.id;
        const oldPassword = this.changePasswordForm.value.oldPassword;
        const newPassword = this.changePasswordForm.value.newPassword;
        this.authService.changePassword(id, oldPassword, newPassword).pipe(
            catchError(error => {
                console.log(error);
                return throwError(error);
            }))
            .subscribe(
                data => {
                    this.passwordChanged =true;
                    console.log(data);
                }
            );
    }

}
