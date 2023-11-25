import { ErrorModel } from './../Common/ErrorModel';
export class LoginResponseModel {
  UserName: string;
  Name: string;
  Type: string;
  Location: string;
  Error: ErrorModel;
  image: string;
}