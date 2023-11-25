import { ErrorModel } from "../Common/ErrorModel";
import { ServiceReportInfo } from "./ServiceReportInfo";

export class GetJobServiceReportResponseModel {
  ServiceReportInfo: ServiceReportInfo;
  Error: ErrorModel;
}


