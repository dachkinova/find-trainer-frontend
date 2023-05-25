import {Component, OnInit, ViewChild} from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {TrainerService} from "../../../../service/trainer.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import { startWith, map } from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
    selector: 'app-job-listings-page',
    templateUrl: './job-listings-page.component.html',
    styleUrls: ['./job-listings-page.component.scss']
})
export class JobListingsPageComponent implements OnInit {
    // cities: any;
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

    myControl = new FormControl();
    filteredCities: any;

    cities: any[] = [];

    @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

    constructor(public cityService: CityService, public trainerService: TrainerService, private router: Router) {

    }
    ngOnInit(): void {
        this.cityService.getCities().subscribe(result => {
            console.log(result);
            this.cities = result;
        });
        this.filteredCities = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        this.cityService.getSports().subscribe(result => {
            console.log(result);
            this.sports = result;
        });
        this.trainerService.getAllTrainers().subscribe(result => {
            console.log(result);
            this.trainersData = result.filter((trainer: any) => trainer.confirmed === true);

            // Calculate time difference for each trainer
            this.trainersData.forEach((trainer: any) => {
                const creationDate = new Date(trainer.userId.creationDate);
                const currentDate = new Date();
                const timeDifference = Math.floor((currentDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));

                trainer.timeSinceCreation = timeDifference > 0 ? `${timeDifference} day(s) ago` : 'Today';
            });

            this.filterData = this.trainersData;
        });
        // this.filterArray = [];
        // this.filterGender = "";
        // this.filterCategory = "";
        // this.filterTypeOfTraining = "";
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.cities.filter(city => city.city.toLowerCase().includes(filterValue));
    }

    // setFilterDataDropdown(event: any) {
    //     const selectedCity = event.option.value;
    //     console.log(selectedCity); // Do something with the selected city value
    //     // ...
    // }
    //
    // toFilterData(e: any) {
    //     this.filterData = this.trainersData.filter((t: any) => t.gender === e.target.value);
    //     this.filterGender = e.target.value;
    //     this.filterArray.push(this.filterGender)
    //     console.log(this.filterData)
    // }

    setFilterData(e: any) {
        if(e.target!=undefined) {
            let type = e.target.id;
            let value = e.target.value;
            if (type === 'name') {
                this.filterName = value;
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
            if (type === 'minPrice') {
                this.filterPriceMinValue = value;
            }
            if (type === 'maxPrice') {
                this.filterPriceMaxValue = value;
            }
        } else {
            if (e.option.id === 'location') {
                this.filterLocation = e.option.value;
            }
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
            let finalFilter = result.filter((trainer: any) => trainer.confirmed === true)
            console.log(finalFilter);
            this.filterData = finalFilter;
        });
    }

    handleSortChange(e: any) {
        let sortOption = e.target.value;

        // Sort the trainers based on the selected option
        if (sortOption === 'Default') {
            this.filterData = this.trainersData;
        } else if (sortOption === 'Latest') {
            this.sortDataByCreationDateNewerFirst();
        } else if (sortOption === 'Price: low to high') {
            this.sortDataByPriceLowToHigh();
        } else if (sortOption === 'Price: high to low') {
            this.sortDataByPriceHighToLow();
        }
    }

    sortDataByPriceLowToHigh(): void {
        if (this.filterData) {
            this.filterData.sort((a: any, b: any) => {
                if (a.price && b.price) {
                    return a.price - b.price;
                }
                return 0;
            });
        }
    }

    sortDataByPriceHighToLow(): void {
        if (this.filterData) {
            this.filterData.sort((a: any, b: any) => {
                if (a.price && b.price) {
                    return b.price - a.price;
                }
                return 0;
            });
        }
    }

    sortDataByCreationDateNewerFirst(): void {
        if (this.filterData) {
            this.filterData.sort((a: any, b: any) => {
                if (a.creationDate && b.creationDate) {
                    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
                }
                return 0;
            });
        }
    }
}
