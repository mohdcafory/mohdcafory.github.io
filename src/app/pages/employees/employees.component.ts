import { AddEmpPermissionRequestModel } from './../../models/AddEmpPermission/AddEmpPermissionRequestModel';
import { PermissionType } from './../../models/GetPermissionTypes/PermissionType';

import { LoginResponseModel } from './../../models/Account/LoginResponseModel';
import { Router } from '@angular/router';
import { AppService } from './../../utils/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { EngSvcApiService } from './../../utils/EngSvcApi/eng-svc-api.service';
import { EmpInfo } from './../../models/GetEmpInfos/EmpInfo';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { userImg } from 'src/app/models/GlobalConsts';
import { GetEmpInfosRequestModel } from 'src/app/models/GetEmpInfos/GetEmpInfosRequestModel';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesComponent implements OnInit {


  @ViewChild('search', { static: false }) search: any;

  img: string;
  permDate: NgbDateStruct;
  permFromDate: NgbDateStruct;
  permToDate: NgbDateStruct;
  permFromTime: NgbTime;
  permToTime: NgbTime;
  permPeriodType: string;
  noData: boolean = false;
  errorMessage: string;
  selectedPermType: string = "";
  EmpInfos: EmpInfo[] = [];
  employeesCount: number;
  loading: boolean;
  userInfo: LoginResponseModel;
  showListFlag: boolean = true;
  showGridFlag: boolean = false;
  columns: any[];
  rows: any[];
  temp: any[];
  permissionTypes: PermissionType[];

  isAddingPermLoading: boolean = false;


  display = "none";
  modalTitle: string = "";

  selectedEmpInfo: EmpInfo;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  selectedEmpName: string = "";

  constructor(private engSvcApi: EngSvcApiService,
    private toastr: ToastrService,
    private appService: AppService,
    private router: Router) {
    this.img = userImg;
    console.log("Employees");
    
    this.loading = false;
  }


  ngOnInit() {
    this.userInfo = this.appService.getUserInfo();

    this.columns = [
      { prop: 'EmpCode', name: 'Employee Code', width: 100 },
      { prop: 'EmpName', name: 'Employee Name', width: 250 },
      { prop: 'EmpLocation', name: 'Location', width: 250 }
    ];

    if (this.userInfo == null) {
      this.appService.logout();
      this.router.navigate(['/login']);
    }
    else {
      // this.GetPermissionTypes();
      this.GetEmpInfos();
    }

    this.columns.forEach((col: any) => {
      const colWidth = this.columns.find(colWidth => colWidth.prop === col.prop);
      if (colWidth) {
        col.width = colWidth.width;
      }
    });
  }

  GetEmpInfos() {

    var req = new GetEmpInfosRequestModel();
    req.Location = this.userInfo.Location;

    this.loading = true;


    this.engSvcApi.GetEmpInfos(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {
        this.EmpInfos = response.EmpInfos;
        this.loading = false;
        this.rows = this.EmpInfos;
        this.temp = this.EmpInfos;

        console.log(this.EmpInfos);

      }
      else {
        this.toastr.error(response.Error.ErrorMessage, 'Dashboard');
        this.loading = false;
        this.noData = true;
        this.errorMessage = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loading = false;
        this.noData = true;
        this.errorMessage = "Sorry, Unable to connect to server, please try again";
        // this.toastr.error("Sorry, Unable to connect to server, please try again", 'Dashboard');
      });
  }


  GetPermissionTypes() {


    this.engSvcApi.GetPermissionTypes().subscribe(response => {
      if (response.Error.ErrorCode == "200") {
        this.permissionTypes = response.PermissionTypes;
        console.log(this.permissionTypes);

      }
      else {
        this.toastr.error(response.Error.ErrorMessage, 'Dashboard');
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Dashboard');
      });
  }

  updateFilter(val: any) {

    const value = val.toString().toLowerCase().trim();
    console.log(value);
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    // this.rows = this.temp.filter(item => {
    //   // iterate through each row's column data
    //   for (let i = 0; i < count; i++) {
    //     // check for a match
    //     if (
    //       (item[keys[i]] &&
    //         item[keys[i]]
    //           .toString()
    //           .toLowerCase()
    //           .indexOf(value) !== -1) ||   !value
    //     ) {
    //       // found match, return true to add to result set
    //       return true;
    //     }
    //   }
    // });

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  showGrid() {
    this.showGridFlag = true;
    this.showListFlag = false;
  }
  showList() {
    this.showGridFlag = false;
    this.showListFlag = true;
  }

  LogHours(value) {
    console.log(value);
    this.selectedEmpInfo = value;
    this.selectedEmpName = this.selectedEmpInfo.EmpName;

    this.display = "block";

    this.selectedPermType = "";
    this.permPeriodType = "";
    this.permFromDate = null;
    this.permToDate = null;
    this.permDate = null;
    this.permFromTime = null;
    this.permToTime = null;
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // fromEvent(this.search.nativeElement, 'keydown')
    //   .pipe(
    //     debounceTime(550),
    //     map(x => x['target']['value'])
    //   )
    //   .subscribe(value => {
    //     this.updateFilter(value);
    //   });
  }

  onCloseHandled() {
    this.display = "none";
    this.permPeriodType = "";
    this.selectedPermType = "";

    this.permFromDate = null;
    this.permToDate = null;
    this.permDate = null;
    this.permFromTime = null;
    this.permToTime = null;
  }

  choosePermPeriod(event) {
    this.permPeriodType = event;
    console.log(event);
    console.log(this.permPeriodType);
  }

  selectPermissionType(event) {
    this.selectedPermType = event.target.value;
  }

  logPermission() {
    console.log(this.permPeriodType);
    console.log(this.selectedPermType);
    console.log(this.selectedEmpInfo);
    console.log(this.permFromDate);
    console.log(this.permToDate);
    console.log(this.permFromTime);
    console.log(this.permToTime);

    var req = new AddEmpPermissionRequestModel();
    req.EmpCode = this.selectedEmpInfo.EmpCode;
    req.PermissionCode = this.selectedPermType;
    if (this.permPeriodType == "day") {

      var fromMonth = this.permFromDate.month.toString().length == 1 ? "0" + this.permFromDate.month : this.permFromDate.month;
      var fromDay = this.permFromDate.day.toString().length == 1 ? "0" + this.permFromDate.day : this.permFromDate.day;
      var toMonth = this.permToDate.month.toString().length == 1 ? "0" + this.permToDate.month : this.permToDate.month;
      var toDay = this.permToDate.day.toString().length == 1 ? "0" + this.permToDate.day : this.permToDate.day;

      req.PermissionUom = "D";
      req.PermissionFrom = this.permFromDate.year + "-" + fromMonth + "-" + fromDay + " 12:00:00";
      req.PermissionTo = this.permToDate.year + "-" + toMonth + "-" + toDay + " 12:00:00";

    }
    if (this.permPeriodType == "hour") {
      var month = this.permDate.month.toString().length == 1 ? "0" + this.permDate.month : this.permDate.month;
      var day = this.permDate.day.toString().length == 1 ? "0" + this.permDate.day : this.permDate.day;

      var fromHour = this.permFromTime.hour.toString().length == 1 ? "0" + this.permFromTime.hour : this.permFromTime.hour;
      var fromMinute = this.permFromTime.minute.toString().length == 1 ? "0" + this.permFromTime.minute : this.permFromTime.minute;
      var fromSecond = this.permFromTime.second.toString().length == 1 ? "0" + this.permFromTime.second : this.permFromTime.second;

      var toHour = this.permToTime.hour.toString().length == 1 ? "0" + this.permToTime.hour : this.permToTime.hour;
      var toMinute = this.permToTime.minute.toString().length == 1 ? "0" + this.permToTime.minute : this.permToTime.minute;
      var toSecond = this.permToTime.second.toString().length == 1 ? "0" + this.permToTime.second : this.permToTime.second;


      req.PermissionUom = "H";
      req.PermissionFrom = this.permDate.year + "-" + month + "-" + day + " " + fromHour + ":" + fromMinute + ":" + fromSecond;
      req.PermissionTo = this.permDate.year + "-" + month + "-" + day + " " + toHour + ":" + toMinute + ":" + toSecond;
    }

    console.log(req);
    console.log(JSON.stringify(req));

    this.isAddingPermLoading = true;


    this.engSvcApi.AddEmpPermission(req).subscribe(response => {
      if (response.Error.ErrorCode == "545") {
        this.isAddingPermLoading = false;
        this.toastr.success(response.Error.ErrorMessage, "Log Permission");
        this.display = "none";
      } else {
        this.isAddingPermLoading = false;
        this.toastr.error(response.Error.ErrorMessage, "Log Permission");
      }
    },
      error => {

        this.isAddingPermLoading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", "Log Permission");
      });

  }

  refreshEmployeesList() {
    this.GetEmpInfos();
  }

  onSelect(event) {
    //event.type is undefined, use below:

    console.log(event.selected);
  }

  OnActivate(event) {
    if (event.type == 'click') {
      // console.log(event.row);

      this.router.navigate(['/employee-timeCards'], {
        state: { employeeTimeCard: event.row }
      });
      // console.log(event.row);
    }
  }

}