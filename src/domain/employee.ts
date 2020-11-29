import {Visit} from './visit';

export interface Employee {
  name:string;
  occupation:string;
  RFIDtag:string;
  idCompany:number;
  visits:Visit[];
}
