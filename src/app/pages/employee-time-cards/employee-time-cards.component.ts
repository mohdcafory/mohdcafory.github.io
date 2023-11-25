import { LoginResponseModel } from './../../models/Account/LoginResponseModel';
import { AppService } from './../../utils/services/app.service';
import { EmployeeTimeCard } from './../../models/GetAsmTimeCards/EmployeeTimeCard';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-employee-time-cards',
  templateUrl: './employee-time-cards.component.html',
  styleUrls: ['./employee-time-cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeTimeCardsComponent implements OnInit {
  employeeTimeCard: EmployeeTimeCard;
  columns: any[];
  enableSummary: boolean = true;
  rows: any[];
  userInfo: LoginResponseModel;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  single: any[];
  view: any[] = [800, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'top';

  pieChartValues: any[] = [];

  colorScheme = {
    // domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    domain: ['#424242','#28A745','#068D9D','#6D9DC5','#AEECEF']
  };
  showListFlag: boolean = true;
  showGridFlag: boolean = false;
  totalWorkedHrs: number = 0;

  constructor(private router: Router,
    private appService: AppService) {
    if (this.router.getCurrentNavigation().extras != null) {
      this.employeeTimeCard = this.router.getCurrentNavigation().extras.state.employeeTimeCard;

      let sum = 0;
      this.employeeTimeCard.TimeCards.forEach(element => {
        sum += parseFloat(element.DiffInHrs);
      });

      this.employeeTimeCard.EmpDayWorkingHrs = sum;

    }
    else {
      router.navigate(['/employee-timeCards']);
    }


    const result = [...this.employeeTimeCard.TimeCards.reduce((r, o) => {
      const key = o.ActivityType;

      const item = r.get(key) || Object.assign({}, o, {
        WorkedHrs: 0
      });

      item.WorkedHrs += parseFloat(o.DiffInHrs);

      return r.set(key, item);
    }, new Map).values()];


    var res = result.filter(r => r.WorkedHrs > 0);

    console.log(res);
    res.forEach(element => {

      
      this.pieChartValues.push({ name: element.ActivityType, value: element.WorkedHrs })
    });

    
  }
  ngOnInit(): void {


    this.userInfo = this.appService.getUserInfo();
    // this.columns = [
    //   { prop: 'ActivityType', name: 'Activity Type', width: 250, summaryFunc: null },
    //   { prop: 'ActivitySubType', name: 'Activity Sub Type', width: 250, summaryFunc: null },
    //   { prop: 'StartTime', name: 'Start Time', width: 250, summaryFunc: null },
    //   { prop: 'EndTime', name: 'End Time', width: 250, summaryFunc: null },
    //   { prop: 'JobNo', name: 'Job No', width: 250, summaryFunc: null },
    //   { prop: 'Comments', name: 'Comments', width: 250, summaryFunc: null },
    //   { prop: 'DiffInHrs', name: 'Time Spent', width: 250, summaryFunc: (cells) => cells.reduce((sum, cell) => sum += cell) }
    // ];
    this.caclulateSumm();

  }

  emptySumm() {
    return null;
  }

  caclulateSumm() {
    this.employeeTimeCard.TimeCards.forEach((item) => {
      this.totalWorkedHrs += parseFloat(item.DiffInHrs);
    });
  }

  onSelect(event) {
    //event.type is undefined, use below:

    
  }



  onActivate(data): void {
    
  }

  onDeactivate(data): void {
    
  }

  OnActivate(event) {
    if (event.type == 'click') {
      
    }
  }



  showGrid() {
    this.showGridFlag = true;
    this.showListFlag = false;
  }
  showList() {
    this.showGridFlag = false;
    this.showListFlag = true;
  }

}
