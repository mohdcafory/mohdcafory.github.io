import { EmployeeTimeCard } from './EmployeeTimeCard';
import { ErrorModel } from './../Common/ErrorModel';

export class GetAsmTimeCardsResponseModel {
    EmployeeTimeCards: EmployeeTimeCard[];
    Error: ErrorModel;

}