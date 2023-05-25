import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import { CandidatesPageComponent } from './components/pages/candidates-page/candidates-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CompaniesPageComponent } from './components/pages/companies-page/companies-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { JobDetailsPageComponent } from './components/pages/job-details-page/job-details-page.component';
import { JobListingsPageComponent } from './components/pages/job-listings-page/job-listings-page.component';
import { MainHomeComponent } from './components/pages/main-home/main-home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { TrainerInfoPageComponent } from './components/pages/trainer-info-page/trainer-info-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import {RegisterPageComponent} from "./components/pages/register-page/register-page.component";
import {PaymentPageComponent} from "./components/pages/payment/payment-page.component";
import {FileUploadComponent} from "./components/file/image-upload/file-upload.component";
import {ReservationsPageComponent} from "./components/pages/reservations-page/reservations-page.component";
import {AdminPageComponent} from "./components/pages/admin-page/admin-page.component";
import {AuthGuard} from "../service/auth.guard";
import {ChangePasswordPageComponent} from "./components/pages/change-password-page/change-password-page.component";

const routes: Routes = [
    {path: '', component: MainHomeComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'image', component: FileUploadComponent},
    {path: 'job-listings', component: JobListingsPageComponent},
    {path: 'job-details', component: JobDetailsPageComponent},
    {path: 'post-a-job', component: TrainerInfoPageComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_TRAINER'] }},
    {path: 'companies', component: CompaniesPageComponent},
    {path: 'profile-details', component: ProfilePageComponent},
    {path: 'payment', component: PaymentPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'candidates', component: CandidatesPageComponent},
    {path: 'candidate-details', component: CandidateDetailsPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'reservations', component: ReservationsPageComponent},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] }},
    {path: 'changePassword', component: ChangePasswordPageComponent },

    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
