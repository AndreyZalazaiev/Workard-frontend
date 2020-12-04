import {Employee} from './employee';
import {Room} from './room';
import {Recommendation} from './recommendation';

export class Company {
  id:number;
  name:string;

  rooms:Room[];
  employees:Employee[];
  recommendations:Recommendation[];
}
