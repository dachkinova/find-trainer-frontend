import {Component, OnInit} from '@angular/core';
import {TrainerService} from "../../../../service/trainer.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Router} from "@angular/router";
import {BookingService} from "../../../../service/booking.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {catchError, empty} from "rxjs";
import {StorageService} from "../../../../service/storage.service";

@Component({
    selector: 'app-candidate-details-page',
    templateUrl: './candidate-details-page.component.html',
    styleUrls: ['./candidate-details-page.component.scss']
})
export class CandidateDetailsPageComponent implements OnInit {

    currentUser: any;

    currentTrainer: any;
    minDate: any;
    selectedDate: any;
    selectedHour: any;
    hoursAll: string[] = [
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00'
    ];
    hoursAvailable: any;

    bookedHoursForDate: any;

    bookingStatus: boolean = false;

    reliable: boolean = true;
    constructor(public trainerService: TrainerService, public bookingService : BookingService,
                public router : Router, private datePipe: DatePipe, private storageService : StorageService) {
    }


    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        if(this.currentUser.notReliable==3) {
            this.reliable = false;
        }
        if(this.trainerService.currentTrainerInfo!=undefined) {
            this.currentTrainer = this.trainerService.currentTrainerInfo;
        } else {
            this.router.navigateByUrl("/job-listings")
        }

        this.minDate=new Date();
        this.hoursAvailable = this.hoursAll;
    }

    setHoursData(e: any) {
        this.selectedHour = e.target.value;
    }

    createReservation() {
        this.bookingService.createReservation(this.selectedDate, this.selectedHour, this.currentTrainer.id)
            .pipe(
            catchError(error => {
                return empty();
            })
        ).subscribe(res => {
            console.log(res);
            this.bookingStatus = true;
            this.hoursAvailable = this.hoursAll;
            this.selectedHour = null;
            this.selectedDate = null;
            setTimeout(() => {
                this.bookingStatus = false;
            }, 5000);
        }, error => {
            console.log(error);
            this.bookingStatus = false;
        });
    }

    chosenDate(event: MatDatepickerInputEvent<Date>) {
        const date = event.value;
        console.log('Selected Date:', date);
        this.selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        this.bookingService.getReservationsByTrainerAndDate(this.currentTrainer.id, this.selectedDate).pipe(
            catchError(error => {
                return empty();
            })
        ).subscribe(result => {
            console.log(result);
            this.bookedHoursForDate = result;
            this.hoursAvailable = this.hoursAll.filter(item => !this.bookedHoursForDate.includes(item))
            console.log(this.bookedHoursForDate);
        });
    }

    testimonialsSlides: OwlOptions = {
        items: 1,
        nav: false,
        margin: 25,
        loop: true,
        dots: true,
        autoplay: false,
        autoplayHoverPause: true,
        navText: [
            "<i class='ri-arrow-left-s-line'></i>",
            "<i class='ri-arrow-right-s-line'></i>",
        ]
    }
}
