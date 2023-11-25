import { ServiceReportImage } from "./ServiceReportImage";

export class ServiceReportModel {
  Id: string;
  JobNo: string;
  TotalTripKm: string;
  Date: string;
  CustomerInfoLocation: string;
  CustomerInfoPhoneNo: string;
  CustomerInfoCallDate: string;
  CustomerInfoOHoursKm: string;
  CustomerComplain: string;
  Symptoms: string;
  InvestigationAndFindings: string;
  ActionsTakenAndCurrentStatus: string;
  Recommedations: string;
  JobDone: string;
  MachineRunning: string;
  Customer: string;
  Tools: string;
  Information: string;
  SpareParts: string;
  Other: string;
  OtherRemarks: string;
  TeamMembers: string;
  PartsUsed: string;
  SparePartTakenByRequistion: string;
  SparePartTakenByCustomer: string;
  SparePartTakenByCannibalization: string;
  CannibalizationFromMcSn: string;
  CannibalizationLocation: string;
  SparePartTakenExtraCharges: string;
  CustomerComments: string;
  cr_uid: string;
  submit_dt: string;
  submitted: string;
  submit_uid: string;
  appr_yn: string;
  appr_uid: string;
  appr_dt: string;
  Confirm: string;
  customerSignature: string;
  ServiceReportImages: ServiceReportImage[];
}