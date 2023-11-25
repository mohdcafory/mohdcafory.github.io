import { ApiService } from './../../utils/services/api.service';
import { FormBuilder } from '@angular/forms';
import { AppService } from './../../utils/services/app.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { JourneyInfo } from 'src/app/models/JourneyInfo/JourneyInfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  journeys: JourneyInfo[] = [];
  machinesFuelConsumption: any[] = [];

  machinesAxisLabel = "Cars"
  display = "none";
  constructor(private api: ApiService,
    private toastr: ToastrService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private router: Router) {


  }

  ngOnInit() {

    this.api.getRecordsofJourney().subscribe(records => {
      console.log(records);
      this.journeys = records;
      this.loadingIndicator = false;
    });

    // this.journeys.forEach(record => {
    this.machinesFuelConsumption.push({
      name: "Machine 1",
      series: [
        {
          "name": "Fuel Consumption",
          "value": 50
        }
      ]
    });

    this.machinesFuelConsumption.push({
      name: "Machine 2",
      series: [
        {
          "name": "Fuel Consumption",
          "value": 30
        }
      ]
    });

    this.machinesFuelConsumption.push({
      name: "Machine 3",
      series: [
        {
          "name": "Fuel Consumption",
          "value": 70
        }
      ]
    });
    // });
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  OnActivate(event) {
    if (event.type == 'click') {
      console.log(event.row);

      // this.router.navigate(['/employee-timeCards'], {
      //   state: { employeeTimeCard: event.row }
      // });
    }
  }
}
