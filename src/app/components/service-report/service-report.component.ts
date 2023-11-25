import { JobTimeCard } from './../../models/GetJobTimeCards/JobTimeCard';
import { ServiceReportInfo } from "./../../models/GetJobServiceReport/ServiceReportInfo";
import { Component, Input, OnInit } from "@angular/core";
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-service-report",
  templateUrl: "./service-report.component.html",
  styleUrls: ["./service-report.component.scss"]
})
export class ServiceReportComponent implements OnInit {

  @Input() ServiceReportInfo: ServiceReportInfo;
  @Input() JobTimeCards: JobTimeCard[];

  YesJobDone: boolean = false;
  NoJobDone: boolean = false;
  YesMachineRunning: boolean = false;
  NoMachineRunning: boolean = false;

  NoWhyCustomer: boolean = false;
  NoWhyTools: boolean = false;
  NoWhyInformation: boolean = false;
  NoWhyOther: boolean = false;
  NoWhySpareParts: boolean = false;

  SparePartTakenByRequistion: boolean = false;
  SparePartTakenByCustomer: boolean = false;
  SparePartTakenByCannibalization: boolean = false;
  display: string;

  imgName: string = "";
  imgNumber: number = 1;
  imgLength: number = 0;

  constructor() { 
    
  }

  change(data) {
    this.imgNumber = data.current + 1;
    this.imgName = "";
    // this.belowImageData = JSON.parse(JSON.stringify(this.ServiceReportInfo.ServiceReportImages));
    // this.belowImageData.splice(data.current, 1);
  }

  ngOnInit(): void {

    console.log(this.ServiceReportInfo);
    console.log("JobTimeCards");
    console.log(this.JobTimeCards);

    this.YesJobDone = this.ServiceReportInfo.JobDone == "Y" ? true : false;
    this.NoJobDone = this.ServiceReportInfo.JobDone == "N" ? true : false;

    this.YesMachineRunning = this.ServiceReportInfo.MachineRunning == "Y" ? true : false;
    this.NoMachineRunning = this.ServiceReportInfo.MachineRunning == "N" ? true : false;

    this.NoWhyCustomer = this.ServiceReportInfo.Customer == "Y" ? true : false;
    this.NoWhyTools = this.ServiceReportInfo.Tools == "Y" ? true : false;
    this.NoWhyInformation = this.ServiceReportInfo.Information == "Y" ? true : false;
    this.NoWhySpareParts = this.ServiceReportInfo.SpareParts == "Y" ? true : false;
    this.NoWhyOther = this.ServiceReportInfo.Other == "Y" ? true : false;

    this.SparePartTakenByRequistion = this.ServiceReportInfo.SparePartTakenByRequistion == "Y" ? true : false;
    this.SparePartTakenByCustomer = this.ServiceReportInfo.SparePartTakenByCustomer == "Y" ? true : false;
    this.SparePartTakenByCannibalization = this.ServiceReportInfo.SparePartTakenByCannibalization == "Y" ? true : false;
    this.imgLength  = this.ServiceReportInfo.ServiceReportImages.length;

    this.JobTimeCards.forEach(jobTimeCard => {
      jobTimeCard.TotalHrs = new Date(jobTimeCard.StartTime).getHours().toString()
    });
  }

  openModal() {
    this.display = "block";
  }

  currentSlide(id: string) {

  }

  onCloseHandled() {
    this.display = "none";
  }

}
