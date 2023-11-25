import { ReportStatusModel } from './../../models/ReportStatusModel';
import { GetServiceReportListRequestModel } from './../../models/GetServiceReportList/GetServiceReportListRequestModel';
import { EntryInspectionInfo } from './../../models/GetEntryInspectionInfo/EntryInspectionInfo';
import { GetEntryInspectionListRequestModel } from './../../models/GetEntryInspectionList/GetEntryInspectionListRequestModel';
import { JobTypeModel } from './../../models/GetJobFolderList/JobTypeModel';
import { AppService } from './../..//utils/services/app.service';
import { LocationModel } from './../../models/GetLocationsList/LocationModel';
import { EngSvcApiService } from './../../utils/EngSvcApi/eng-svc-api.service';
import { LoginResponseModel } from './../../models/Account/LoginResponseModel';
import { Router } from '@angular/router';
import { JobFolderInfoModel } from './../../models/GetJobFolderList/JobFolderInfoModel';
import { ApiService } from './../../utils/services/api.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceReportModel } from "../../models/GetSubmittedServiceReports/ServiceReportModel";
import { GetServiceCenterOpenedJobsRequestModel } from './../../models/GetServiceCenterOpenedJobs/GetServiceCenterOpenedJobsRequestModel';


@Component({
  templateUrl: './service-reports.component.html',
  styleUrls: ['./service-reports.component.scss']
})
export class ServiceReportsComponent implements OnInit {

  jobFolderList: JobFolderInfoModel[] = [];
  ServiceReportList: ServiceReportModel[] = [];
  searchJobFolderList: JobFolderInfoModel[] = [];
  loading: boolean = false;

  selectedJobFolder: JobFolderInfoModel;


  @ViewChild(DataTableDirective, { static: true })

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  display = "none";
  noData: boolean = false;
  errorMessage: string = "";
  fromDate = Date.now();
  toDate = Date.now();
  jobNo: string = "";
  jobType: string = "";
  reportStatus: string = "";
  serviceCenter: string = "";


  filterJobFolder: FormGroup;
  userInfo: LoginResponseModel;
  OpenedJobs: JobFolderInfoModel[] = [];
  SearchOpenedJobs: JobFolderInfoModel[] = [];
  Locations: LocationModel[] = [];

  JobTypes: JobTypeModel[] = [];
  EntryInspectionList: EntryInspectionInfo[] = [];

  filterFlag: boolean = false;
  

  ReportStatuses: ReportStatusModel[] = [];
  showHideFilterText: string = "Show Filter";
  showHideFilterIcon: string = "ion-arrow-expand";

  constructor(private renderer: Renderer2,
    private toastr: ToastrService,
    private api: EngSvcApiService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router) {

    this.userInfo = this.appService.getUserInfo();

    var emptyJobTyp = new JobTypeModel();
    emptyJobTyp.JobTypeCode = "";
    emptyJobTyp.JobTypeName = "Select Job Type";
    var crJobTyp = new JobTypeModel();
    crJobTyp.JobTypeCode = "05CRAJB";
    crJobTyp.JobTypeName = "Automotive - 05CRAJB";
    var eqJobTyp = new JobTypeModel();
    eqJobTyp.JobTypeCode = "05EQAJB";
    eqJobTyp.JobTypeName = "Equipments - 05EQAJB";

    this.JobTypes.push(emptyJobTyp);
    this.JobTypes.push(crJobTyp);
    this.JobTypes.push(eqJobTyp);

    var emptyStatus = new ReportStatusModel();
    emptyStatus.StatusTypeText = "Select Status";
    emptyStatus.StatusTypeValue = "";
    var submittedStatus = new ReportStatusModel();
    submittedStatus.StatusTypeText = "Submitted";
    submittedStatus.StatusTypeValue = "Y";
    var onProgressStatus = new ReportStatusModel();
    onProgressStatus.StatusTypeText = "On Progress";
    onProgressStatus.StatusTypeValue = "N";

    this.ReportStatuses.push(emptyStatus);
    this.ReportStatuses.push(submittedStatus);
    this.ReportStatuses.push(onProgressStatus);

    
    var emptyLocation = new LocationModel();
    emptyLocation.LocationCode = "Select Service Center";

    this.Locations.push(emptyLocation);

    this.serviceCenter = "Select Service Center";
  }

  ngOnInit(): void {

    this.filterFlag = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: true
    };
    // setTimeout(() => {

    if (this.userInfo.Type == "ASM-EQ") {
      this.jobType = "05EQAJB";
    }
    else if (this.userInfo.Type == "ASM-CR") {
      this.jobType = "05CRAJB";
    }
    this.getJobFolderList(this.jobType, this.userInfo.Location);

    this.getServiceReportList();

    this.getServiceCenterLocations();
    // }, 1000);

    this.filterJobFolder = this.formBuilder.group({

      JobNo: [
        ""
      ],
      FromDate: [
        ""
      ],
      ToDate: [
        ""
      ],
      JobType: [
        ""
      ],
      Status: [
        ""
      ],
      ServiceCenter: [
        ""
      ]
    });
  }

  getServiceCenterLocations() {
    this.api.GetLocationist().subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        response.Locations.forEach(location => {
          this.Locations.push(location);
        });

      }
      else {
        this.toastr.error(response.Error.ErrorMessage, 'Job Folder');
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Job Folder');
      });
  }

  refreshJobFolderList() {
    this.jobNo = "";
    this.serviceCenter = "";
    this.reportStatus = "";
    this.getServiceReportList();

  }



  getJobFolderList(jobType: string, serviceCenter: string) {
    console.log("getJobFolderList");
    this.loading = true;


    this.noData = false;
    this.errorMessage = "";

    var req = new GetServiceCenterOpenedJobsRequestModel();
    req.Location = serviceCenter; //this.userInfo.Location;
    req.JobType = jobType;

    // if (this.userInfo.Type == "ASM-EQ") {
    //   req.JobType = "05EQAJB";
    // }
    // else if (this.userInfo.Type == "ASM-CR") {
    //   req.JobType = "05CRAJB";
    // }
    this.api.GetServiceCenterOpenedJobs(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.OpenedJobs = response.OpenedJobs;
        // this.jobFolderList = response.JobFolderInfos;

        // this.jobFolderList.forEach(jobFolder => {

        //   if (jobFolder.JobImage != "") {
        //     jobFolder.JobImage = apiURL + jobFolder.JobImage;
        //   }
        // });

        // this.searchJobFolderList = this.jobFolderList;
        this.SearchOpenedJobs = this.OpenedJobs;

        this.loading = false;

      }
      else {
        // this.toastr.error(response.Error.ErrorMessage, 'Service Reports');
        this.loading = false;

        this.SearchOpenedJobs = [];
        this.OpenedJobs = [];

        this.noData = true;
        this.errorMessage = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Service Reports');
        this.noData = true;
        this.errorMessage = "Sorry, Unable to connect to server, please try again";
      });
  }

  getServiceReportList() {

    console.log(this.fromDate);
    console.log(this.toDate);
    var fromDate = Date.parse(this.fromDate.toString()).toString() != "NaN" ? this.fromDate.toString() : "";
    var toDate = Date.parse(this.toDate.toString()).toString() != "NaN" ? this.toDate.toString() : "";
    var req = new GetServiceReportListRequestModel();
    req.EmpCode = "";
    req.JobNo = this.jobNo;
    req.FromDate = fromDate;
    req.ToDate = toDate;
    req.ServiceCenter = this.serviceCenter == "Select Service Center" ? this.userInfo.Location : this.serviceCenter;
    req.Status = this.reportStatus;

    this.loading = true;
    this.noData = false;
    this.errorMessage = "";

    this.api.GetServiceReportList(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {
        this.loading = false;
        this.ServiceReportList = response.JobServiceReportList;

      }
      else {
        // this.toastr.error(response.Error.ErrorMessage, 'Service Reports');
        this.loading = false;
        this.noData = true;
        this.errorMessage = response.Error.ErrorMessage;
        this.ServiceReportList = [];
      }
    },
      error => {
        this.loading = false;
        this.noData = true;
        this.ServiceReportList = [];
        this.errorMessage = "Sorry, Unable to connect to server, please try again";
        // this.toastr.error("Sorry, Unable to connect to server, please try again", 'Service Reports');
      });
  }

  // openJobFolder(job: JobFolderInfoModel) {
  openJobFolder(job: JobFolderInfoModel) {
    this.router.navigate(['/job-folder-details'], {
      state: { job: job }
    });
  }

  searchJobFolder(jobFolderName: string) {
    if (jobFolderName != "" && jobFolderName != null) {
      var jobs = this.SearchOpenedJobs.filter(item =>
        Object.keys(item).some(k => item[k] != null &&
          item[k].toString().toLowerCase()
            .includes(jobFolderName.toLowerCase()))
      );

      if (jobs.length > 0) {

        this.noData = false;
        this.OpenedJobs = jobs;
      } else {
        console.log(jobs);
        this.noData = true;
        this.errorMessage = "No Service Reports found";
        this.OpenedJobs = null;
      }

    } else {

      this.noData = false;
      this.OpenedJobs = this.SearchOpenedJobs;
    }
  }

  showJobFolderImages(JobFolderInfo: JobFolderInfoModel) {

    this.selectedJobFolder = JobFolderInfo;
    console.log(this.selectedJobFolder);

    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }


  searchJob(event) {
    console.log(event);

    if (event != "") {
      var job = this.OpenedJobs.filter(job => job.JobNo.includes(event));

      console.log(job);
    }
  }

  search() {
    var serviceCenter = "";
    if (this.serviceCenter == "") {
      if (this.userInfo.Type == "ADMIN") {
        serviceCenter = "HQ";
        this.serviceCenter = "HQ";
      }
      else {
        serviceCenter = this.userInfo.Location;
        this.serviceCenter = this.userInfo.Location;
      }
    }
    else if (this.serviceCenter == "Select Service Center") {
      serviceCenter = "HQ";
      this.serviceCenter = "HQ";
    }
    else {
      serviceCenter = this.serviceCenter;
    }
    this.getServiceReportList();
  }

  showHideFilter() {
    this.filterFlag = !this.filterFlag;
    if (this.filterFlag == false) {
      this.showHideFilterText = "Show Filter";
      this.showHideFilterIcon = "ion-arrow-expand";
    }
    if (this.filterFlag == true) {

      this.showHideFilterText = "Hide Filter";
      this.showHideFilterIcon = "ion-arrow-shrink";
    }
  }

  clear() {
    this.filterJobFolder.reset();
    this.jobNo = "";
    this.serviceCenter = "Select Service Center";
    this.reportStatus = "";
    this.getServiceReportList();
  }

}
