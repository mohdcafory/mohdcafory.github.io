import { ErrorModel } from './../Common/ErrorModel';
import { EmpInfo } from "./EmpInfo";

export class GetEmpInfosResponseModel {
  EmpInfos: EmpInfo[];
  Error: ErrorModel;
}
