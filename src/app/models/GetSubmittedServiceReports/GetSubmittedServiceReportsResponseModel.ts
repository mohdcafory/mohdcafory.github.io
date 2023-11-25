import { ErrorModel } from "../Common/ErrorModel";
import { ServiceReportModel } from "./ServiceReportModel";

export class GetSubmittedServiceReportsResponseModel {
  ServiceReports: ServiceReportModel[];
  Error: ErrorModel;
}