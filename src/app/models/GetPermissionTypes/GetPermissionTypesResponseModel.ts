import { ErrorModel } from '../Common/ErrorModel';
import { PermissionType } from "./PermissionType";

export class GetPermissionTypesResponseModel {
  PermissionTypes: PermissionType[];
  Error: ErrorModel;
}

