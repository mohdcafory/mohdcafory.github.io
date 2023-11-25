import { ErrorModel } from '../Common/ErrorModel';
import { JobTimeCard } from './JobTimeCard';

export class GetJobTimeCardResponseModel {
  JobTimeCards: JobTimeCard[];
  Error: ErrorModel;
}