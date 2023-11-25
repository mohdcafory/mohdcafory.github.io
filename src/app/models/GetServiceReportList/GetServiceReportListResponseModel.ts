import { ServiceReportModel } from '../GetSubmittedServiceReports/ServiceReportModel';
import { ErrorModel } from '../Common/ErrorModel';

export class GetServiceReportListResponseModel {
  Error: ErrorModel;
  JobServiceReportList: ServiceReportModel[];
}