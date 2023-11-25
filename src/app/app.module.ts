import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from './views/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './components/app-button/app-button.component';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { JobFolderListComponent } from './pages/job-folder-list/job-folder-list.component';
import { HttpClientModule } from '@angular/common/http';
import { JobInfoListComponent } from './pages/job-info-list/job-info-list.component';
import { DataTablesModule } from 'angular-datatables';
import { Daterangepicker } from 'ng2-daterangepicker';
import { JobFolderDetailsComponent } from './pages/job-folder-details/job-folder-details.component';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EntryInspectionReportComponent } from './components/entry-inspection-report/entry-inspection-report.component';
import { ServiceReportComponent } from './components/service-report/service-report.component';
import { EntryInspectionsComponent } from './pages/entry-inspections/entry-inspections.component';
import { ServiceReportsComponent } from './pages/service-reports/service-reports.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { EmployeesComponent } from './pages/employees/employees.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimeCardsComponent } from './pages/time-cards/time-cards.component';
import { EmployeeTimeCardsComponent } from './pages/employee-time-cards/employee-time-cards.component';
import { RecordsOfJourneyComponent } from './pages/recordsOfJourney/recordsOfJourney.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    AppButtonComponent,
    UserDropdownMenuComponent,
    JobFolderListComponent,
    JobInfoListComponent,
    JobFolderDetailsComponent,
    EntryInspectionReportComponent,
    ServiceReportComponent,
    EntryInspectionsComponent,
    ServiceReportsComponent,
    EmployeesComponent,
    TimeCardsComponent,
    EmployeeTimeCardsComponent,
    RecordsOfJourneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapSliderModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    Daterangepicker,
    TabsModule,
    NgxDatatableModule
  ],
  providers: [
    DatePipe],
  bootstrap: [AppComponent,
    DatePipe],
})
export class AppModule { }
