import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {StorageService} from "../../../../service/storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    currentUser: any;
    isLoggedIn = false;

    constructor(public authService: AuthService, public storageService: StorageService, private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        this.isLoggedIn = this.storageService.isLoggedIn();
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
        this.router.navigateByUrl('/login')
        this.storageService.clean();
        window.location.reload();

    }


}