import { JobFolderInfoModel } from '../GetJobFolderList/JobFolderInfoModel';
import { ErrorModel } from './../Common/ErrorModel';
export class GetServiceCenterOpenedJobsResponseModel {
  OpenedJobs: JobFolderInfoModel[];
  Error: ErrorModel;
}