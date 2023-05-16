import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {TrainerService} from "../../../../service/trainer.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../common/confirmation-dialog/confirmation-dialog.component";
import {catchError, empty} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-job-listings-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    cities: any;
    sports: any;
    trainersData: any;
    filterData: any;

    constructor(public trainerService: TrainerService, private router: Router, private dialog: MatDialog) {
    }


    ngOnInit(): void {
        this.trainerService.getAllTrainers().subscribe(result => {
            console.log(result);
            this.trainersData = result.filter((trainer: any) => trainer.confirmed === false);
            this.filterData = this.trainersData;
        });
    }

    toTrainerProfile(userId: number): void {
        this.trainerService.getTrainerInfoById(userId).subscribe(result => {
            console.log(result);
            this.trainerService.currentTrainerInfo = result;
            this.router.navigateByUrl('/candidate-details')
        });

    }
    confirmAccept(userId: number): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {title: 'Confirmation', message: 'Are you sure you want to accept this profile?'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.trainerService.updateProfileStatus(userId, true).pipe(
                    catchError(error => {
                        return empty();
                    }))
                    .subscribe(res => console.log(res));
                this.reloadPage();
            }
        });
    }

    confirmDecline(userId: number): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {title: 'Confirmation', message: 'Are you sure you want to decline this profile?'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.trainerService.updateProfileStatus(userId, false).pipe(
                    catchError(error => {
                        return empty();
                    }))
                    .subscribe(res => console.log(res));
                this.reloadPage();
            }
        });

    }

    reloadPage(): void {
        window.location.reload();
    }

}
