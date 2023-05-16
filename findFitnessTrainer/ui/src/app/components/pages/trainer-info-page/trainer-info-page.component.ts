import {Component, OnDestroy, OnInit} from '@angular/core';
import {Editor, Toolbar} from 'ngx-editor';
import {CityService} from "../../../../service/city.service";
import {catchError, empty, Observable} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {TrainerService} from "../../../../service/trainer.service";
import {StorageService} from "../../../../service/storage.service";
import {FileUploadService} from "../../../../service/file-upload.service";

@Component({
    selector: 'app-post-a-job-page',
    templateUrl: './trainer-info-page.component.html',
    styleUrls: ['./trainer-info-page.component.scss']
})
export class TrainerInfoPageComponent implements OnInit, OnDestroy {

    editor: any;
    html: any;
    cities: any;
    sports: any;
    category: any;
    typeOfTraining: any;
    city: any;
    gender: any;
    formData: any;
    showError: any;
    clickedButton:any = false
    clickedButtonToPayment:any = false
    currentUser: any;
    imageInfos?: Observable<any>;


    get telephone() { return this.formData.get('telephone'); }
    get about() { return this.formData.get('about'); }
    get experience() { return this.formData.get('experience'); }
    get certifications() { return this.formData.get('certifications'); }
    get price() { return this.formData.get('price'); }

    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    constructor(public cityService: CityService,
                private router: Router,
                private formBuilder: FormBuilder,
                public trainerService: TrainerService,
                public storageService: StorageService, public uploadService: FileUploadService) {
    }
    changeCategory(e: any) {
        this.category = e.target.value;
        console.log(e.target.value);
    }

    changeGender(e: any) {
        this.gender = e.target.value;
        console.log(e.target.value);
    }

    changeCity(e: any) {
        this.city = e.target.value;
        console.log(e.target.value);
    }

    changeTypeOfTraining(e: any) {
        this.typeOfTraining = e.target.value;
        this.formData.controls.typeOfTraining.value = e.target.value;
        console.log(e.target.value);
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        this.editor = new Editor();
        this.cityService.getCities().subscribe(result => {
            console.log(result);
            this.cities = result;
        });
        this.cityService.getSports().subscribe(result => {
            console.log(result);
            this.sports = result;
        });
        this.formData = this.formBuilder.group({
            gender: new FormControl(''),
            telephone: new FormControl(''),
            town: new FormControl(''),
            about: new FormControl(''),
            experience: new FormControl(''),
            certifications: new FormControl(''),
            price: new FormControl(''),
            category: new FormControl(''),
            typeOfTraining: new FormControl('')
        });
        this.imageInfos = this.uploadService.getFiles(this.currentUser.id);
        this.showError=false;
    }

    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

    nextButton(){
        this.clickedButton = true;
    }

    goBackToEdit(){
        this.clickedButton = false;
    }

    toPayment() {
        this.clickedButtonToPayment = true;
    }

    postTrainerInformation() {
        console.log(this.formData.get('about'));
        this.trainerService.createTrainerInfo(this.gender, this.formData.controls.telephone.value,
            this.city, this.formData.controls.about.value, this.formData.controls.experience.value,
            this.formData.controls.certifications.value, this.category, this.typeOfTraining, this.formData.controls.price.value)
            .pipe(
                catchError(error => {
                    this.showError = true
                    return empty();
                })
            )
            .subscribe(res => this.router.navigateByUrl('/candidate-details')
            );
        console.log(this.formData.controls.telephone.value);
    };

}
