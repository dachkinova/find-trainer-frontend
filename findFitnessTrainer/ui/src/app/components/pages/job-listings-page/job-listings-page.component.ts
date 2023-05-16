import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {TrainerService} from "../../../../service/trainer.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-job-listings-page',
    templateUrl: './job-listings-page.component.html',
    styleUrls: ['./job-listings-page.component.scss']
})
export class JobListingsPageComponent implements OnInit {
    cities: any;
    sports: any;
    trainersData: any;
    filterData: any;


    filterName: string | null = null;
    filterLocation: string | null = null;
    filterCategory: string | null = null;
    filterTypeOfTraining: string | null = null;
    filterGender: string | null = null;
    filterRating: string | null = null;
    filterPriceMinValue: number | null = null;
    filterPriceMaxValue: number | null = null;


    filterType: any;
    filterArray: any;
    alreadyFiltered: any;
    currentTrainerData: any;

    constructor(public cityService: CityService, public trainerService: TrainerService, private router: Router) {
    }

    // setFilter() {
    //     return this.filterArray = {
    //         category: this.filterCategory,
    //         gender: this.filterGender,
    //         typeOfTraining: this.filterType,
    //         payment: this.filterPayment,
    //         rating: this.filterRating
    //     }
    // }


    ngOnInit(): void {
        this.cityService.getCities().subscribe(result => {
            console.log(result);
            this.cities = result;
        });
        this.cityService.getSports().subscribe(result => {
            console.log(result);
            this.sports = result;
        });
        this.trainerService.getAllTrainers().subscribe(result => {
            console.log(result);
            this.trainersData = result.filter((trainer: any) => trainer.confirmed === true);
            this.filterData = this.trainersData;
        });
        // this.filterArray = [];
        // this.filterGender = "";
        // this.filterCategory = "";
        // this.filterTypeOfTraining = "";
    }

    toFilterData(e: any) {
        this.filterData = this.trainersData.filter((t: any) => t.gender === e.target.value);
        this.filterGender = e.target.value;
        this.filterArray.push(this.filterGender)
        console.log(this.filterData)
    }

    setFilterData(e: any) {
        let type = e.target.id;
        let value = e.target.value;
        if(type === 'name') {
            this.filterName = value;
        }
        if(type === 'location') {
            this.filterLocation = value;
        }
        if (type === 'category') {
            this.filterCategory = value;
        }
        if (type === 'typeOfTraining') {
            this.filterTypeOfTraining = value;
        }
        if (type === 'gender') {
            this.filterGender = value;
        }
        if (type === 'rating') {
            this.filterRating = value;
        }
        if(type === 'minPrice') {
            this.filterPriceMinValue = value;
        }
        if(type === 'maxPrice') {
            this.filterPriceMaxValue = value;
        }
    }

    // filterTrainers() {
    //     // this.setFilterData(e.target.id, e.target.value)
    //     if (this.filterCategory !== "") {
    //         this.filterData = this.trainersData.filter((t: any) => t.category === this.filterCategory);
    //     }
    //     if (this.filterTypeOfTraining !== "") {
    //         this.filterData = this.trainersData.filter((t: any) => t.typeOfTraining === this.filterTypeOfTraining);
    //     }
    //     if (this.filterGender !== "") {
    //         this.filterData = this.trainersData.filter((t: any) => t.gender === this.filterGender);
    //     }
    //     this.filterCategory = "";
    //     this.filterTypeOfTraining = "";
    //     this.filterGender = "";
    // }

    clearFilters() {
        this.filterCategory = "";
        this.filterTypeOfTraining = "";
        this.filterGender = "";
        this.reloadPage();
        this.filterData = this.trainersData;
    }

    reloadPage(): void {
        window.location.reload();
    }

    toTrainerProfile(userId: number): void {
        this.trainerService.getTrainerInfoById(userId).subscribe(result => {
            console.log(result);
            this.trainerService.currentTrainerInfo = result;
            this.router.navigateByUrl('/candidate-details')
        });

    }

    filter() {
        this.filterData = this.trainerService.filterTrainersByCriteria(this.filterName, this.filterLocation,
                this.filterCategory, this.filterTypeOfTraining, this.filterGender,
                this.filterRating, this.filterPriceMinValue, this.filterPriceMaxValue).subscribe(result => {
            console.log(result);
            this.filterData = result;
        });
    }
}
