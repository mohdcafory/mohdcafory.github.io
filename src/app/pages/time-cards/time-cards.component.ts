import { element } from 'protractor';
import { DatePipe } from '@angular/common';
import { EmployeeTimeCard } from './../../models/GetAsmTimeCards/EmployeeTimeCard';
import { GetAsmTimeCardsRequestModel } from './../../models/GetAsmTimeCards/GetAsmTimeCardsRequestModel';
import { LocationModel } from './../../models/GetLocationsList/LocationModel';
import { GetEmpInfosRequestModel } from './../../models/GetEmpInfos/GetEmpInfosRequestModel';
import { Router } from '@angular/router';
import { userImg } from './../../models/GlobalConsts';
import { EngSvcApiService } from './../../utils/EngSvcApi/eng-svc-api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './../../utils/services/app.service';
import { LoginResponseModel } from './../../models/Account/LoginResponseModel';
import { EmpInfo } from './../../models/GetEmpInfos/EmpInfo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-time-cards',
  templateUrl: './time-cards.component.html',
  styleUrls: ['./time-cards.component.scss']
})
export class TimeCardsComponent implements OnInit {

  @ViewChild('search', { static: false }) search: any;

  img: string;
  noData: boolean = false;
  errorMessage: string;
  EmpInfos: EmpInfo[] = [];

  EmployeeTimeCards: EmployeeTimeCard[] = [];
  TempEmployeeTimeCards: EmployeeTimeCard[] = [];

  empCode: string = "";
  serviceCenter: string = "";

  fromDate: string = "";
  toDate: string = "";
  employeesCount: number;
  loading: boolean;
  userInfo: LoginResponseModel;
  showListFlag: boolean = false;
  showGridFlag: boolean = true;
  columns: any[];
  rows: any[];
  temp: any[];

  isAddingPermLoading: boolean = false;


  display = "none";
  modalTitle: string = "";

  selectedEmpInfo: EmpInfo;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  selectedEmpName: string = "";
  filterTimeCard: FormGroup;


  showHideFilterText: string = "Show Filter";
  showHideFilterIcon: string = "ion-arrow-expand";
  filterFlag: boolean = false;

  Locations: LocationModel[] = [];
  resetEmployeeTimeCards: EmployeeTimeCard[];

  today = new Date(Date.now());

  single: any[];
  view: any[] = [500, 300];
  viewModal: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  trimLabels: boolean = false;
  legendPosition: string = 'top';

  pieChartValuesBySrvcCenter: any[] = [];
  pieChartValuesByActivity: any[] = [];
  pieChartValuesModal: any[] = [];

  valuesBySrvcCenterColorScheme = {
    // domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    domain: ['#424242', '#28A745', '#068D9D', '#6D9DC5', '#AEECEF', '#C7B42C']
  };

  valuesByActivityColorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#28A745',]
    // domain: ['#424242', '#28A745', '#068D9D', '#6D9DC5', '#AEECEF']
  };
  totalWorkedHrs: number = 0;
  modalValues: any[] = [];
  data = [
    {
      "name": "locale (82.47 MiB)",
      "value": 86478037
    },
    {
      "name": "doc (36.46 MiB)",
      "value": 38228585
    },
    {
      "name": "vim (20.96 MiB)",
      "value": 21981872
    },
    {
      "name": "backgrounds (19.29 MiB)",
      "value": 20221956
    },
    {
      "name": "perl5 (15.43 MiB)",
      "value": 16183308
    },
    {
      "name": "cracklib (8.95 MiB)",
      "value": 9389476
    },
    {
      "name": "man (8.7 MiB)",
      "value": 9123801
    },
    {
      "name": "i18n (8.31 MiB)",
      "value": 8711012
    },
    {
      "name": "hwdata (6.48 MiB)",
      "value": 6793919
    },
    {
      "name": "mime (3.77 MiB)",
      "value": 3953983
    },
    {
      "name": "misc (2.78 MiB)",
      "value": 2911432
    },
    {
      "name": "grub (2.56 MiB)",
      "value": 2687890
    },
    {
      "name": "zoneinfo (2.47 MiB)",
      "value": 2594995
    },
    {
      "name": "GeoIP (2.44 MiB)",
      "value": 2558148
    },
    {
      "name": "info (2.41 MiB)",
      "value": 2530689
    },
    {
      "name": "Other",
      "value": 12183535
    }
  ];

  constructor(private engSvcApi: EngSvcApiService,
    private toastr: ToastrService,
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) {
    this.img = userImg;
    this.loading = false;

    var emptyLocation = new LocationModel();
    emptyLocation.LocationCode = "Select Service Center";
    this.Locations.push(emptyLocation);

    var emp = new EmpInfo();
    emp.EmpCode = "Select an Engineer / Technician";
    emp.EmpLocation = "";
    emp.EmpName = "Select an Engineer / Technician";
    this.EmpInfos.push(emp);

    this.fromDate = datePipe.transform(this.today, "yyyy-MM-dd").toString();
    this.toDate = datePipe.transform(this.today, "yyyy-MM-dd").toString();

  }


  ngOnInit() {
    this.userInfo = this.appService.getUserInfo();

    this.columns = [
      { prop: 'EmpCode', name: 'Employee Code', width: 100 },
      { prop: 'EmpName', name: 'Employee Name', width: 250 },
      { prop: 'Activity', name: 'Activity', width: 100 },
      { prop: 'SubActivity', name: 'Sub Activity', width: 250 },
      { prop: 'JobNumber', name: 'Job No.', width: 250 },
      { prop: 'StartTime', name: 'Start Time', width: 250 },
      { prop: 'EndTime', name: 'End Time', width: 250 }
    ];

    this.filterTimeCard = this.formBuilder.group({

      EmpCode: [
        ""
      ],
      FromDate: [
        ""
      ],
      ToDate: [
        ""
      ],
      ServiceCenter: [
        ""
      ]
    });

    if (this.userInfo == null) {
      this.appService.logout();
      this.router.navigate(['/login']);
    }
    else {
      this.GetEmpInfos();
      this.getServiceCenterLocations();
      this.getTimeCards(this.fromDate, this.toDate, this.userInfo.Location);
    }

    this.columns.forEach((col: any) => {
      const colWidth = this.columns.find(colWidth => colWidth.prop === col.prop);
      if (colWidth) {
        col.width = colWidth.width;
      }
    });

    // const result = [...this.EmployeeTimeCards.TimeCards.reduce((r, o) => {
    //   const key = o.ActivityType;

    //   const item = r.get(key) || Object.assign({}, o, {
    //     WorkedHrs: 0
    //   });

    //   item.WorkedHrs += parseFloat(o.DiffInHrs);

    //   return r.set(key, item);
    // }, new Map).values()];


    // var res = result.filter(r => r.WorkedHrs > 0);
    // res.forEach(element => {


    //   this.pieChartValuesByActivity.push({ name: element.ActivityType, value: element.WorkedHrs })
    // });

  }

  getServiceCenterLocations() {
    this.engSvcApi.GetLocationist().subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.Locations = this.Locations.concat(response.Locations);
        // response.Locations.forEach(location => {
        //   var loc = new LocationModel();
        //   loc.LocationCode = location.LocationCode;
        //   this.Locations.push(loc);
        // });

      }
      else {
        this.toastr.error(response.Error.ErrorMessage, 'Time Cards');
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Time Cards');
      });
  }

  getTimeCards(fromDateSelection: string, toDateSelection: string, locationCode: string) {
    var req = new GetAsmTimeCardsRequestModel();
    req.FromDate = fromDateSelection;
    req.ToDate = toDateSelection;
    req.LocationCode = this.userInfo.Location == "HQ" ? this.userInfo.Location : locationCode;

    this.engSvcApi.GetEmployeesTimeCard(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        this.loading = false;
        this.noData = false;


        this.EmployeeTimeCards = response.EmployeeTimeCards;
        this.TempEmployeeTimeCards = response.EmployeeTimeCards;
        this.resetEmployeeTimeCards = response.EmployeeTimeCards;

        this.calculateValuesBySrvcCenterSummary();
        this.calculateValuesByActivitySummary();

      }
      else {
        this.toastr.error(response.Error.ErrorMessage, 'Time Cards');
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error("Sorry, Unable to connect to server, please try again", 'Time Cards');
      });
  }

  GetEmpInfos() {

    var req = new GetEmpInfosRequestModel();
    req.Location = this.userInfo.Location;

    this.loading = true;


    this.engSvcApi.GetEmpInfos(req).subscribe(response => {
      if (response.Error.ErrorCode == "200") {

        response.EmpInfos.forEach(empInfo => {
          var emp = new EmpInfo();
          emp.EmpCode = empInfo.EmpCode;
          emp.EmpName = empInfo.EmpName;
          emp.EmpLocation = empInfo.EmpLocation;
          emp.EmpType = empInfo.EmpType
          this.EmpInfos.push(emp);
        });

        this.EmpInfos = this.EmpInfos;

        this.loading = false;
        this.rows = this.EmpInfos;
        this.temp = this.EmpInfos;

      }
      else {
        this.toastr.error(response.Error.ErrorMessage, 'Time Cards');
        this.loading = false;
        this.noData = true;
        this.errorMessage = response.Error.ErrorMessage;
      }
    },
      error => {
        this.loading = false;
        this.noData = true;
        this.errorMessage = "Sorry, Unable to connect to server, please try again";
        this.toastr.error(this.errorMessage, 'Time Cards');
      });
  }


  showGrid() {
    this.showGridFlag = true;
    this.showListFlag = false;
  }
  showList() {
    this.showGridFlag = false;
    this.showListFlag = true;
  }

  refreshEmployeesList() {
    this.GetEmpInfos();
    this.getServiceCenterLocations();
    this.getTimeCards("", "", this.userInfo.Location);
  }

  onSelect(event) {
    //event.type is undefined, use below:

    // console.log(event.selected);
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
    // console.log(this.filterFlag);
  }

  goToEmployeeTimeCard(employeeTimeCard: EmployeeTimeCard) {
    this.router.navigate(['/employee-timeCards'], {
      state: { employeeTimeCard: employeeTimeCard }
    });
  }

  clear() {

    this.filterTimeCard.reset();

    this.EmployeeTimeCards = this.resetEmployeeTimeCards;

    this.fromDate = Date.parse(this.fromDate).toString() != "NaN" ? this.fromDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
    this.toDate = Date.parse(this.toDate).toString() != "NaN" ? this.toDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();


  }

  filterTimeCards() {
    this.getTimeCards(this.fromDate, this.toDate, this.userInfo.Location);

  }

  filterTimeCardByEngineer() {
    this.TempEmployeeTimeCards = this.resetEmployeeTimeCards;
    this.EmployeeTimeCards = this.empCode != "Select an Engineer / Technician" ? this.TempEmployeeTimeCards.filter(emp => emp.EmpCode == this.empCode) : this.resetEmployeeTimeCards;
  }

  filterTimeCardByLocation() {
    this.TempEmployeeTimeCards = this.resetEmployeeTimeCards;
    this.EmployeeTimeCards = this.serviceCenter != "Select Service Center" ? this.TempEmployeeTimeCards.filter(emp => emp.EmpLocation == this.serviceCenter) : this.resetEmployeeTimeCards;

  }


  onActivate(data): void {

  }

  onDeactivate(data): void {

  }

  calculateValuesBySrvcCenterSummary() {

    this.pieChartValuesBySrvcCenter = [];

    var result = [];
    this.EmployeeTimeCards.reduce(function (res, emp) {
      if (!res[emp.EmpLocation]) {
        res[emp.EmpLocation] = { name: emp.EmpLocation, value: 0 };
        result.push(res[emp.EmpLocation]);
      }

      res[emp.EmpLocation].value += parseFloat(emp.EmpActualWorkedHrs);
      return res;
    }, {});

    var totalVal = result.reduce((accumulator, obj) => {
      return accumulator + obj.value;
    }, 0);
    result.forEach(element => {
      var elementPercent = element.value / totalVal;
      
      element.ValPercent = parseFloat((elementPercent * 100).toFixed(2));
    });

    result.forEach(element => {
      element.name = element.name + ' (' + element.ValPercent + '%)';
    });



    this.pieChartValuesBySrvcCenter = result;
  }

  calculateValuesByActivitySummary() {

    this.pieChartValuesByActivity = [];

    var result = [];
    var timeCards = [];

    this.EmployeeTimeCards.forEach(emp => {
      emp.TimeCards.forEach(timeCard => {
        timeCards.push(timeCard);
      });
    });

    timeCards.reduce(function (res, value) {
      if (!res[value.ActivityType]) {
        res[value.ActivityType] = { name: value.ActivityType, value: 0 };
        result.push(res[value.ActivityType])
      }
      res[value.ActivityType].value += parseFloat(value.DiffInHrs);
      return res;
    }, {});

    var totalVal = result.reduce((accumulator, obj) => {
      return accumulator + obj.value;
    }, 0);

    result.forEach(element => {
      var elementPercent = element.value / totalVal;
      
      element.ValPercent = parseFloat((elementPercent * 100).toFixed(2));
    });

    

    result.forEach(element => {
      element.name = element.name + ' (' + element.ValPercent + '%)';
    });


    this.pieChartValuesByActivity = result;
  }

  openModal(chartValues: any, title: any) { //, chartType: any) {


    // this.chartType = chartType;
    this.modalValues = chartValues;

    if (title == 1) {

      this.modalTitle = "Time Cards Summary By Activity Type";
    } else if (title == 2) {

      this.modalTitle = "Time Cards Summary By Service Center";
    }
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

}
