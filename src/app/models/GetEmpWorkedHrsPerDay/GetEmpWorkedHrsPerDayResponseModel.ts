import { ErrorModel } from "../Common/ErrorModel";
import { EmpWorkedHr } from "./EmpWorkedHr";

export class GetEmpWorkedHrsPerDayResponseModel {
  EmpWorkedHrs: EmpWorkedHr[];
  Error: ErrorModel;
}


