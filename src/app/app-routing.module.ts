import { EmployeeTimeCardsComponent } from './pages/employee-time-cards/employee-time-cards.component';
import { EntryInspectionsComponent } from './pages/entry-inspections/entry-inspections.component';
import { ServiceReportsComponent } from './pages/service-reports/service-reports.component';
import { JobInfoListComponent } from './pages/job-info-list/job-info-list.component';
import { JobFolderListComponent } from './pages/job-folder-list/job-folder-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BlankComponent } from './views/blank/blank.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { JobFolderDetailsComponent } from './pages/job-folder-details/job-folder-details.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { TimeCardsComponent } from './pages/time-cards/time-cards.component';
import { RecordsOfJourneyComponent } from './pages/recordsOfJourney/recordsOfJourney.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'blank',
        component: BlankComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'job-folder',
        component: JobFolderListComponent
      },
      {
        path: 'job-info',
        component: JobInfoListComponent
      },
      {
        path: 'job-folder-details',
        component: JobFolderDetailsComponent
      },
      {
        path: 'entry-inspections',
        component: EntryInspectionsComponent
      },
      {
        path: 'service-reports',
        component: ServiceReportsComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'timeCards',
        component: TimeCardsComponent
      },
      {
        path: 'employee-timeCards',
        component: EmployeeTimeCardsComponent
      },
      {
        path: 'journey-records',
        component: RecordsOfJourneyComponent
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
