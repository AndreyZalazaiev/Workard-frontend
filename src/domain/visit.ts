import DateTimeFormat = Intl.DateTimeFormat;

export interface Visit {
  id:number;
  idRoom:number;
  idEmployee:number;
  entryTime:Date;
  exitTime:Date;
}
