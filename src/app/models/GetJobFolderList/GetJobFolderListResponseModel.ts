import { ErrorModel } from './../Common/ErrorModel';
import { JobFolderInfoModel } from './JobFolderInfoModel';
export class GetJobFolderListResponseModel {
  JobFolderInfos: JobFolderInfoModel[];
  Error: ErrorModel;
}