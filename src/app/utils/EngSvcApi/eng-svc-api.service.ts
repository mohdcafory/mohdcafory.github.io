import { GetAsmTimeCardsResponseModel } from './../../models/GetAsmTimeCards/GetAsmTimeCardsResponseModel';
import { GetAsmTimeCardsRequestModel } from './../../models/GetAsmTimeCards/GetAsmTimeCardsRequestModel';
import { AddEmpPermissionRequestModel } from './../../models/AddEmpPermission/AddEmpPermissionRequestModel';
import { AddEmpPermissionResponseModel } from './../../models/AddEmpPermission/AddEmpPermissionResponseModel';
import { GetEmpInfosRequestModel } from './../../models/GetEmpInfos/GetEmpInfosRequestModel';
import { GetBilledActualBilledTimeCardRequestModel } from './../../models/GetDashInfos/GetBilledActualTimeCard/GetBilledActualBilledTimeCardRequestModel';
import { GetBilledActualBilledTimeCardResponseModel } from './../../models/GetDashInfos/GetBilledActualTimeCard/GetBilledActualBilledTimeCardResponseModel';
import { GetServiceReportListRequestModel } from "./../../models/GetServiceReportList/GetServiceReportListRequestModel";
import { GetServiceReportListResponseModel } from "./../../models/GetServiceReportList/GetServiceReportListResponseModel";
import { GetEntryInspectionListRequestModel } from './../../models/GetEntryInspectionList/GetEntryInspectionListRequestModel';
import { GetEntryInspectionListResponseModel } from './../../models/GetEntryInspectionList/GetEntryInspectionListResponseModel';
import { GetJobTimeCardRequestModel } from './../../models/GetJobTimeCards/GetJobTimeCardRequestModel';
import { GetJobTimeCardResponseModel } from './../../models/GetJobTimeCards/GetJobTimeCardResponseModel';
import { GetEntryInspectionInfoRequestModel } from './../../models/GetEntryInspectionInfo/GetEntryInspectionInfoRequestModel';
import { GetEntryInspectionInfoResponseModel } from './../../models/GetEntryInspectionInfo/GetEntryInspectionInfoResponseModel';
import { GetJobServiceReportRequestModel } from './../../models/GetJobServiceReport/GetJobServiceReportRequestModel';
import { GetJobServiceReportResponseModel } from './../../models/GetJobServiceReport/GetJobServiceReportResponseModel';
import { GetJobInfoRequestModel } from './../../models/GetJobInfo/GetJobInfoRequestModel';
import { GetJobInfoResponseModel } from './../../models/GetJobInfo/GetJobInfoResponseModel';
import { GetEmpWorkedHrsPerDayRequestModel } from './../../models/GetEmpWorkedHrsPerDay/GetEmpWorkedHrsPerDayRequestModel';
import { GetEmpWorkedHrsPerDayResponseModel } from './../../models/GetEmpWorkedHrsPerDay/GetEmpWorkedHrsPerDayResponseModel';
import { GetDashInfosResponseModel } from './../../models/GetDashInfos/GetDashInfosResponseModel';
import { GetEmpInfosResponseModel } from './../../models/GetEmpInfos/GetEmpInfosResponseModel';
import { GetLocationsListResponseModel } from './../../models/GetLocationsList/GetLocationsListResponseModel';
import { GetServiceCenterOpenedJobsResponseModel } from './../../models/GetServiceCenterOpenedJobs/GetServiceCenterOpenedJobsResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { LoginRequestModel } from './../../models/Account/LoginRequestModel';
import { LoginResponseModel } from './../../models/Account/LoginResponseModel';
import { EchoTestResponseModel } from './../../models/EchoTest/EchoTestResponseModel';
import { GetPublicKeyResponseModel } from './../../models/GetPublicKey/GetPublicKeyResponseModel';
import { apiURL, timeOutTime } from './../../models/GlobalConsts';
import { GetJobFolderListResponseModel } from './../../models/GetJobFolderList/GetJobFolderListResponseModel';
import { GetServiceCenterOpenedJobsRequestModel } from './../../models/GetServiceCenterOpenedJobs/GetServiceCenterOpenedJobsRequestModel';
import { GetSubmittedServiceReportsResponseModel } from './../../models/GetSubmittedServiceReports/GetSubmittedServiceReportsResponseModel';
import { GetDashInfosRequestModel } from './../../models/GetDashInfos/GetDashInfosRequestModel';
import { GetPermissionTypesResponseModel } from './../../models/GetPermissionTypes/GetPermissionTypesResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EngSvcApiService {

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

  public GetPublicKey(): Observable<GetPublicKeyResponseModel> {
    return this.http.get<GetPublicKeyResponseModel>(
      apiURL + 'api/common/GetPublicKey',
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }
  
  public EchoTest(): Observable<EchoTestResponseModel> {
    return this.http.get<EchoTestResponseModel>(
      apiURL + 'api/common/EchoTest',
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }

  public Login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      apiURL + 'api/account/login',
      JSON.stringify(loginRequest),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetJobFolderList(): Observable<GetJobFolderListResponseModel> {
    return this.http.get<GetJobFolderListResponseModel>(
      apiURL + 'api/Jobs/GetJobFolderList',
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }
  
  public GetSubmittedServiceReports(): Observable<GetSubmittedServiceReportsResponseModel> {
    return this.http.get<GetSubmittedServiceReportsResponseModel>(
      apiURL + 'api/Inspection/GetSubmittedServiceReports',
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }
  
  public GetServiceCenterOpenedJobs(req: GetServiceCenterOpenedJobsRequestModel): Observable<GetServiceCenterOpenedJobsResponseModel> {
    console.log(req);
    return this.http.post<GetServiceCenterOpenedJobsResponseModel>(
      apiURL + 'api/ASM/GetServiceCenterOpenedJobs',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }


  public GetLocationist(): Observable<GetLocationsListResponseModel> {
    return this.http.get<GetLocationsListResponseModel>(
      apiURL + 'api/Quotations/GetLocationsList',
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }


  public GetEmpInfos(req: GetEmpInfosRequestModel): Observable<GetEmpInfosResponseModel> {
    return this.http.post<GetEmpInfosResponseModel>(
      apiURL + 'api/ASM/GetEmpInfos',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }

  public GetDashInfo(req: GetDashInfosRequestModel): Observable<GetDashInfosResponseModel> {
    
      return this.http.post<GetDashInfosResponseModel>(
        apiURL + 'api/ASM/GetDashInfo',
        JSON.stringify(req),
        {
          headers: this.httpOptions
        }).pipe(
          timeout(timeOutTime));
  }

  public GetEmpWorkedHrsPerDay(req: GetEmpWorkedHrsPerDayRequestModel): Observable<GetEmpWorkedHrsPerDayResponseModel> {
    return this.http.post<GetEmpWorkedHrsPerDayResponseModel>(
      apiURL + 'api/Reports/GetEmpWorkedHrsPerDay',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetJobInfo(req: GetJobInfoRequestModel): Observable<GetJobInfoResponseModel> {
    return this.http.post<GetJobInfoResponseModel>(
      apiURL + 'api/ASM/GetJobInfo',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetJobServiceReport(req: GetJobServiceReportRequestModel): Observable<GetJobServiceReportResponseModel> {
    return this.http.post<GetJobServiceReportResponseModel>(
      apiURL + 'api/ASM/GetJobServiceReport',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetEntryInspectionInfo(req: GetEntryInspectionInfoRequestModel): Observable<GetEntryInspectionInfoResponseModel> {
    return this.http.post<GetEntryInspectionInfoResponseModel>(
      apiURL + 'api/ASM/GetEntryInspectionInfo',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }


  public GetJobTimeCardInfo(req: GetJobTimeCardRequestModel): Observable<GetJobTimeCardResponseModel> {
    return this.http.post<GetJobTimeCardResponseModel>(
      apiURL + 'api/ASM/GetJobTimeCardInfo',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetEntryInspectionList(req: GetEntryInspectionListRequestModel): Observable<GetEntryInspectionListResponseModel> {
    return this.http.post<GetEntryInspectionListResponseModel>(
      apiURL + 'api/ASM/GetEntryInspectionList',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetServiceReportList(req: GetServiceReportListRequestModel): Observable<GetServiceReportListResponseModel> {
    return this.http.post<GetServiceReportListResponseModel>(
      apiURL + 'api/ASM/GetServiceReportList',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetBilledActualBilledTimeCard(req: GetBilledActualBilledTimeCardRequestModel): Observable<GetBilledActualBilledTimeCardResponseModel> {
    return this.http.post<GetBilledActualBilledTimeCardResponseModel>(
      apiURL + 'api/Reports/GetBilledTimeCard',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetPermissionTypes(): Observable<GetPermissionTypesResponseModel> {
    return this.http.get <GetPermissionTypesResponseModel>(
      apiURL + 'api/ASM/GetPermissionTypes',
      {
        headers: this.httpOptions
      }).pipe(timeout(timeOutTime));
  }

  public AddEmpPermission(req: AddEmpPermissionRequestModel): Observable<AddEmpPermissionResponseModel> {
    return this.http.post<GetBilledActualBilledTimeCardResponseModel>(
      apiURL + 'api/ASM/AddEmpPermission',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }

  public GetEmployeesTimeCard(req: GetAsmTimeCardsRequestModel): Observable<GetAsmTimeCardsResponseModel> {
    return this.http.post<GetAsmTimeCardsResponseModel>(
      apiURL + 'api/ASM/GetAsmTimeCards',
      JSON.stringify(req),
      {
        headers: this.httpOptions
      }).pipe(
        timeout(timeOutTime));
  }
}
