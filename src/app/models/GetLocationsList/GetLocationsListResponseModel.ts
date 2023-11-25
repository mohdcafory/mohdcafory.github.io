import { ErrorModel } from '../Common/ErrorModel';
import { LocationModel } from './LocationModel';
export class GetLocationsListResponseModel {
  Locations: LocationModel[];
  Error: ErrorModel;
}