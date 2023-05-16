import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../../../../service/booking.service';
import {TrainerService} from '../../../../service/trainer.service';
import {AuthService} from '../../../../service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../../common/confirmation-dialog/confirmation-dialog.component";
import {catchError, empty} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-reservations-page',
    templateUrl: './reservations-page.component.html',
    styleUrls: ['./reservations-page.component.scss']
})
export class ReservationsPageComponent implements OnInit {

    displayedColumns: string[] = ['index', 'name', 'date', 'hour', 'button2', 'button'];
    dataSource: Reservations[] = [];
    currentTrainer: any;
    reservationsData: any;
    trainer: any;

    constructor(
        public bookingService: BookingService,
        public trainerService: TrainerService,
        public authService: AuthService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        var user = this.authService.getUser();
        if (user.isTrainer) {
            this.trainerService.getTrainerInfoById(user.id).subscribe((result) => {
                this.trainer = result;
                this.bookingService.getTrainerReservations(this.trainer.id).subscribe((result) => {
                    this.reservationsData = result;
                    console.log(result);
                    this.dataSource = this.reservationsData.map((item: any, index: any) => {
                        return {
                            index: index + 1,
                            name: `${item.userId.firstName} ${item.userId.lastName}`,
                            date: `${item.date}`,
                            hour: `${item.hour}`,
                            button2: 'Button 2',
                            button: 'Button 1',
                            isConfirmed: item.confirmed,
                            isDeclined: item.declined,
                            idDataBase: item.id,
                            isNotReliable: false
                        };
                    });
                });
            });
        } else {
            this.bookingService.getClientReservations(user.id).subscribe((result) => {
                this.reservationsData = result;
                console.log(result);
                this.dataSource = this.reservationsData.map((item: any, index: any) => {
                    return {
                        index: index + 1,
                        name: `${item.trainerId.userId.firstName} ${item.trainerId.userId.lastName}`,
                        date: `${item.date}`,
                        hour: `${item.hour}`,
                        button2: 'Button 2',
                        button: 'Button 1',
                        isConfirmed: item.confirmed,
                        isDeclined: item.declined,
                        idDataBase: item.id,
                        isNotReliable: false
                    };
                });
            });
        }
    }

    confirmDecline(row: any): void {
        const isNotReliable = row.isNotReliable;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {title: 'Confirmation', message: 'Are you sure you want to decline this reservation?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.bookingService.updateReservationStatus(row.idDataBase, false, true, isNotReliable)
                    .pipe(
                        catchError(error => {
                            console.error(error);
                            return empty();
                        })
                    )
                    .subscribe(res => console.log(res));

                this.dataSource[row.index - 1].isConfirmed = false;
                this.dataSource[row.index - 1].isDeclined = true;
                row.isChecked = true;
            }
        });
    }

    confirmAccept(row: any): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {title: 'Confirmation', message: 'Are you sure you want to accept this reservation?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.bookingService.updateReservationStatus(row.idDataBase, true, false, false).pipe(
                    catchError(error => {
                        return empty();
                    }))
                    .subscribe(res => console.log(res));
                this.dataSource[row.index - 1].isConfirmed = true;
                this.dataSource[row.index - 1].isDeclined = false;
                row.isChecked = true;
            }
        });
    }

}

interface Reservations {
    index: number;
    name: string;
    date: string;
    hour: string;
    button: string;
    button2: string;
    isConfirmed?: boolean;
    isDeclined?: boolean;
    isChecked?: boolean;
    idDataBase: number;

}
