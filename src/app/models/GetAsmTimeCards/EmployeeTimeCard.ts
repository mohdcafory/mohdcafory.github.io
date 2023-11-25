import { JobTimeCard } from './../GetJobTimeCards/JobTimeCard';
export class EmployeeTimeCard {
    EmpName: string;
    EmpCode: string;
    EmpLocation: string;
    EmpLocationWorkingHrs: string;
    EmpActualWorkedHrs: string;
    EmpDayWorkingHrs: number = 0;
    TimeCards: JobTimeCard[];
}