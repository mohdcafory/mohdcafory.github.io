import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/services/api.service';

@Component({
  selector: 'app-records-of-journey',

  templateUrl: './recordsOfJourney.component.html',
  styleUrls: ['./recordsOfJourney.component.scss']
})
export class RecordsOfJourneyComponent implements OnInit {


  constructor(private api: ApiService) {

  }
  ngOnInit() {
    this.getRecordsOfJourney();
  }

  getRecordsOfJourney() {
    this.api.getRecordsofJourney().subscribe(records => {
      console.log(records);

    })
  }


}
