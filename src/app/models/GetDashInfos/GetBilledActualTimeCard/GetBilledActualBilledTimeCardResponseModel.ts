import { ErrorModel } from './../../Common/ErrorModel';
import { BilledTimeCardModel } from "./BilledTimeCardModel";

export class GetBilledActualBilledTimeCardResponseModel {
  BilledTimeCards: BilledTimeCardModel[];
  Error: ErrorModel;
}

