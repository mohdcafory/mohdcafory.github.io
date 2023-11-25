import { JobTimeCard } from './../../models/GetJobTimeCards/JobTimeCard';
import { GetJobTimeCardRequestModel } from './../../models/GetJobTimeCards/GetJobTimeCardRequestModel';
import { EntryInspectionInfo } from './../../models/GetEntryInspectionInfo/EntryInspectionInfo';
import { GetEntryInspectionInfoRequestModel } from './../../models/GetEntryInspectionInfo/GetEntryInspectionInfoRequestModel';
import { ServiceReportInfo } from './../../models/GetJobServiceReport/ServiceReportInfo';
import { GetJobServiceReportRequestModel } from './../../models/GetJobServiceReport/GetJobServiceReportRequestModel';
import { JobInfo } from './../../models/GetJobInfo/JobInfo';
import { GetJobInfoRequestModel } from './../../models/GetJobInfo/GetJobInfoRequestModel';
import { EngSvcApiService } from './../../utils/EngSvcApi/eng-svc-api.service';
import { ServiceReportModel } from './../../models/GetSubmittedServiceReports/ServiceReportModel';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JobFolderInfoModel } from './../../models/GetJobFolderList/JobFolderInfoModel';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-folder-details',
  templateUrl: './job-folder-details.component.html',
  styleUrls: ['./job-folder-details.component.scss']
})
export class JobFolderDetailsComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  jobFolderDetails: JobFolderInfoModel;
  ServiceReport: ServiceReportModel;
  noData: boolean;
  errorMessage: string;
  loading: boolean = false;
  loadingServiceReport: boolean = false;
  loadingEntryInspect: boolean = false;
  JobInfo: JobInfo;
  ServiceReportInfo: ServiceReportInfo;
  EntryInspectionReport: EntryInspectionInfo;
  errorMessageEntryInspection: string;
  noDataEntryInspection: boolean;
  errorMessageServiceReport: string;
  noDataServiceReport: boolean;
  loadingJobTimeCard: boolean;
  noDataJobTimeCard: boolean;
  JobTimeCards: JobTimeCard[];
  constructor(private router: Router,
    private api: EngSvcApiService,
    private toastr: ToastrService) {
    
      
    if (this.router.getCurrentNavigation().extras != null) {
      this.jobFolderDetails = this.router.getCurrentNavigation().extras.state.job;
      // this.jobFolderDetails = this.router.getCurrentNavigation().extras.state.job;
      console.log(this.jobFolderDetails); 
      this.getJobInfo();
      // console.log(this.jobFolderDetails); 
    }
    else
    {
      router.navigate(['/job-folder']);
    }
  }

  ngOnInit(): void {
  }

  getJobInfo()
  {
    this.loading = true;
    this.loadingServiceReport = true;
    this.loadingEntryInspect = true;


    this.noData = false;
    this.errorMessage = "";

    var req = new GetJobInfoRequestModel();
    var jobInfo = new JobInfo();
    jobInfo.JobNo = this.jobFolderDetails.JobNo;
    req.JobInfo = jobInfo;

    this.api.GetJobInfo(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.JobInfo = response.JobInfo;
        this.loading = false;

        console.log(this.JobInfo);

        // setTimeout(() => {
          this.GetJobTimeCard();
          this.GetJobServiceReport();
          this.GetEntryInspectionReport();
        // }, 3000);

      }
      else {
        // this.toastr.error(response.Error.ErrorMessage, 'Job Details');
        this.loading = false;
        this.noData = true;
        this.errorMessage = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Job Details');
      });
  }

  GetJobServiceReport()
  {
    this.loadingServiceReport = true;


    this.noDataServiceReport = false;
    this.errorMessageServiceReport = "";

    var req = new GetJobServiceReportRequestModel();
  
    req.JobNo = this.jobFolderDetails.JobNo;

    this.api.GetJobServiceReport(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.ServiceReportInfo = response.ServiceReportInfo;
        this.loadingServiceReport = false;

        console.log(this.ServiceReportInfo);


      }
      else {
        // this.toastr.error(response.Error.ErrorMessage, 'Job Details');
        this.loadingServiceReport = false;
        this.noDataServiceReport = true;
        this.errorMessageServiceReport = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loadingServiceReport = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Job Details');
      });
  }

  GetEntryInspectionReport()
  {
    this.loadingEntryInspect = true;


    this.noDataEntryInspection = false;
    this.errorMessageEntryInspection = "";

    var req = new GetEntryInspectionInfoRequestModel();
  
    req.JobNo = this.jobFolderDetails.JobNo;

    this.api.GetEntryInspectionInfo(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.EntryInspectionReport = response.EntryInspectionInfo;
        this.loadingEntryInspect = false;

        console.log(this.EntryInspectionReport);

      }
      else {
        // this.toastr.error(response.Error.ErrorMessage, 'Job Details');
        this.loadingEntryInspect = false;
        this.noDataEntryInspection = true;
        this.errorMessageEntryInspection = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loadingEntryInspect = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Job Details');
      });
  }

  GetJobTimeCard()
  {
    this.loadingJobTimeCard = true;


    this.noDataJobTimeCard = false;
    this.errorMessageEntryInspection = "";

    var req = new GetJobTimeCardRequestModel();
  
    req.JobNo = this.jobFolderDetails.JobNo;

    this.api.GetJobTimeCardInfo(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.JobTimeCards = response.JobTimeCards;
        this.loadingEntryInspect = false;

        console.log(this.EntryInspectionReport);

      }
      else {
        this.loadingJobTimeCard = false;
        this.noDataJobTimeCard = true;
        this.errorMessageEntryInspection = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loadingJobTimeCard = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Job Details');
      });
  }

}
