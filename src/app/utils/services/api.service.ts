import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JourneyInfo } from 'src/app/models/JourneyInfo/JourneyInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions: any;
  httpAuthOptions: any;
  token: string;

  constructor(public http: HttpClient) {
    this.httpOptions = {
      'Content-Type': 'application/json'
    };
    this.httpAuthOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    };
  }

  getRecordsofJourney(): Observable<JourneyInfo[]> {
    return this.http.get<JourneyInfo[]>('assets/data/recordsOfJourneyData.json');
  }


}
