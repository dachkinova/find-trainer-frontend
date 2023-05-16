import { Component, OnInit } from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {TrainerService} from "../../../../service/trainer.service";
import {StorageService} from "../../../../service/storage.service";

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  cities: any;
  sports: any;
  trainersData: any;
  filterData: any;
  currentUser: any;

  constructor(public cityService: CityService, public trainerService: TrainerService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
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
      this.trainersData = result;
      this.filterData = result;
    });


  }

}
