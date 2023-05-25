import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {StorageService} from "../../../../service/storage.service";
import {Router} from "@angular/router";
import {TrainerService} from "../../../../service/trainer.service";
import {catchError, empty} from "rxjs";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    currentUser: any;
    isLoggedIn = false;
    isAdmin: boolean = false;
    hasTrainerInfo: boolean = false;

    constructor(public authService: AuthService, public storageService: StorageService, private router: Router, public trainerService: TrainerService) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        this.trainerService.getTrainerInfoById(this.currentUser.id).pipe(catchError(error => {
            return empty();
        })).subscribe(result => {
            if (result) {
                this.hasTrainerInfo = true;
                console.log(result);
            } else {
                this.hasTrainerInfo = false;
            }
        });
        this.isLoggedIn = this.storageService.isLoggedIn();
        this.isAdmin = this.authService.getIsAdmin();
    }

    switcherClassApplied = false;

    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    searchClassApplied = false;

    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }

    classApplied = false;

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    logout(): void {
        this.storageService.clean();
        this.router.navigateByUrl('/login')
        setTimeout(() => {
            this.reloadPage();
        }, 2000);
    }

    toProfileDetails(): void {
        this.router.navigateByUrl('/profile-details')
    }

    reloadPage(): void {
        window.location.reload();
    }
}