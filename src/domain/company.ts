import {Employee} from './employee';
import {Room} from './room';
import {Recommendation} from './recommendation';

export interface Company {
  id:number,
  name:string,

  rooms:Room[];
  employees:Employee[];
  recommendations:Recommendation[];
}
