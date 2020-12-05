import {Visit} from './visit';
import {Device} from './device';

export class Room {
  id:number;
  idCompany:number;
  name:string;
  recommendedValue:string;
  extra:string;
  visits:Visit[];
  devices:Device[];
}
