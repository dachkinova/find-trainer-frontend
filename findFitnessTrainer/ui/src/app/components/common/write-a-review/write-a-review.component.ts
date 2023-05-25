import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {TrainerService} from "../../../../service/trainer.service";
import {empty} from "rxjs";
import {StorageService} from "../../../../service/storage.service";

@Component({
    selector: 'app-write-a-review',
    templateUrl: './write-a-review.component.html',
    styleUrls: ['./write-a-review.component.scss']
})
export class WriteAReviewComponent implements OnInit {

    currentTrainer: any;
    formData: any;
    stars: any;
    review: any;
    rating: any;
    sent = false;

    constructor(private formBuilder: FormBuilder, private trainerService: TrainerService, private storageService: StorageService) {
    }

    getReview(e: any) {
        this.review = e.target.value
    }

    ngOnInit(): void {
        this.currentTrainer = this.trainerService.currentTrainerInfo;
        this.formData = this.formBuilder.group({
            review: new FormControl('')
        });
        this.sent = false;
    }

    onChange(e: any) {
        this.stars = e.target.id;
    }

    sendReview() {

        let userId = this.storageService.getUser().id;
        let trainerId = this.currentTrainer.id;
        console.log(this.formData);
        this.trainerService.sendReview(this.review, this.stars, trainerId, userId).subscribe({
                next: data => {
                    console.log(data)
                    this.sent = true;
                },
                error: err => {
                    return empty();
                }
            }
        )
    }
}