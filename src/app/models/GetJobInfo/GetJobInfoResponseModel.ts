import { ErrorModel } from '../Common/ErrorModel';
import { JobInfo } from './JobInfo';
export class GetJobInfoResponseModel {
  JobInfo: JobInfo;
  Error: ErrorModel;
}