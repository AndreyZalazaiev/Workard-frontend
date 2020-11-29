import {Visit} from './visit';
import {Device} from './device';

export interface Room {
  id:number,
  name:string,
  recommendedValue:string,
  extra:string;
  visits:Visit[];
  devices:Device[];
}
