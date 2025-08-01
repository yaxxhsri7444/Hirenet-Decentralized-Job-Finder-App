import { Routes } from '@angular/router';
import { LogicPageComponent } from './logic-page/logic-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { authGuard } from './auth.guard';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { ResumeUploadComponent } from './resume-upload/resume-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LogicPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'chats', component:ChatpageComponent },
  { path: 'resume-upload', component:ResumeUploadComponent },
  { path: 'profile', component:ProfileComponent },
  {path:'create', component:JobCreateComponent, canActivate: [authGuard]},
  { path: 'jobs/:id', component: JobDetailComponent },
  {path:'about', component: AboutComponent},
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },

];
