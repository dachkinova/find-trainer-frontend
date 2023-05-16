import { TabsModule } from 'ngx-tabset';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHomeComponent } from './components/pages/main-home/main-home.component';
import { TestimonialsComponent } from './components/common/testimonials/testimonials.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CvCtaComponent } from './components/common/cv-cta/cv-cta.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { FeaturedJobsComponent } from './components/common/featured-jobs/featured-jobs.component';
import { CareerTipsComponent } from './components/common/career-tips/career-tips.component';
import { TopCompanyComponent } from './components/common/top-company/top-company.component';
import { PricingComponent } from './components/common/pricing/pricing.component';
import { RecentJobsComponent } from './components/common/recent-jobs/recent-jobs.component';
import { JobsCategoriesComponent } from './components/common/jobs-categories/jobs-categories.component';
import { MainBannerComponent } from './components/common/main-banner/main-banner.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { FunfactsComponent } from './components/common/funfacts/funfacts.component';
import { ServicesComponent } from './components/common/services/services.component';
import { AboutComponent } from './components/common/about/about.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { JobListingsPageComponent } from './components/pages/job-listings-page/job-listings-page.component';
import { JobDetailsPageComponent } from './components/pages/job-details-page/job-details-page.component';
import { TrainerInfoPageComponent } from './components/pages/trainer-info-page/trainer-info-page.component';
import { CompaniesPageComponent } from './components/pages/companies-page/companies-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CandidatesPageComponent } from './components/pages/candidates-page/candidates-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {StringToHtmlDecoderPipe} from "../pipes/StringToHtmlDecoder.pipe";
import {PaymentPageComponent} from "./components/pages/payment/payment-page.component";
import {FileUploadComponent} from "./components/file/image-upload/file-upload.component";
import {WriteAReviewComponent} from "./components/common/write-a-review/write-a-review.component";
import {MaterialModule} from "../additional-modules/additional";
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {ReservationsPageComponent} from "./components/pages/reservations-page/reservations-page.component";
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './components/common/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogTrainerComponent} from "./components/common/confirmation-dialog-trainer/confirmation-dialog-trainer.component";
import {AdminPageComponent} from "./components/pages/admin-page/admin-page.component";


@NgModule({
    declarations: [
        AppComponent,
        MainHomeComponent,
        TestimonialsComponent,
        FooterComponent,
        CvCtaComponent,
        BlogComponent,
        FeaturedJobsComponent,
        CareerTipsComponent,
        TopCompanyComponent,
        PricingComponent,
        PaymentPageComponent,
        RecentJobsComponent,
        JobsCategoriesComponent,
        MainBannerComponent,
        NavbarComponent,
        AboutPageComponent,
        FileUploadComponent,
        FunfactsComponent,
        ServicesComponent,
        AboutComponent,
        ContactPageComponent,
        PricingPageComponent,
        NotFoundComponent,
        PrivacyPolicyPageComponent,
        TermsConditionsPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        FaqPageComponent,
        BlogDetailsPageComponent,
        BlogPageComponent,
        JobListingsPageComponent,
        AdminPageComponent,
        JobDetailsPageComponent,
        TrainerInfoPageComponent,
        CompaniesPageComponent,
        ProfilePageComponent,
        CategoriesPageComponent,
        CandidatesPageComponent,
        CandidateDetailsPageComponent,
        StringToHtmlDecoderPipe,
        WriteAReviewComponent,
        ReservationsPageComponent,
        ConfirmationDialogComponent,
        ConfirmationDialogTrainerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
        AccordionModule,
        BrowserAnimationsModule,
        NgxScrollTopModule,
        NgxSmartModalModule.forRoot(),
        StickyNavModule,
        TabsModule,
        NgxEditorModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        MatTableModule,
        MatButtonModule
    ],
    providers: [
        HttpClientModule,
        DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
