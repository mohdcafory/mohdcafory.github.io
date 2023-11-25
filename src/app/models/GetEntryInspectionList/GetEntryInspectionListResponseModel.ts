import { EntryInspectionInfo } from './../GetEntryInspectionInfo/EntryInspectionInfo';
import { ErrorModel } from './../Common/ErrorModel';
export class GetEntryInspectionListResponseModel {
  Error: ErrorModel;
  EntryInspectionList: EntryInspectionInfo[];
}