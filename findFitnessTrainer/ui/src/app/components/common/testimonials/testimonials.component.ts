import {Component, OnInit} from '@angular/core';
import {TrainerService} from "../../../../service/trainer.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import {AuthService} from "../../../../service/auth.service";
import {UserService} from "../../../../service/user.service";

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    currentTrainer: any;
    reviews: any;
    user: any;

    constructor(public trainerService: TrainerService, public userService : UserService) { }

    ngOnInit(): void {
        this.currentTrainer = this.trainerService.currentTrainerInfo;
        this.trainerService.getRatingsByTrainerId(this.currentTrainer.id).subscribe(result => {
            this.reviews = result;
            console.log(result);
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