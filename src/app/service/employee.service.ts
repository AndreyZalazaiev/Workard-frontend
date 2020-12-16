import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../../domain/company';
import {baseUrl} from '../../environments/environment';
import {HotSpot} from '../../domain/DTO/hotSpot';
import {Employee} from '../../domain/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  token = localStorage.getItem('token');
  header = {Authorization: `Bearer ${this.token}`};

  constructor(private http: HttpClient) {

  }

  public createEmployee(Employee:Employee): Observable<Employee> {
    return this.http.post<Employee>(`${baseUrl}/employee`, Employee, {headers: this.header});
  }
  public deleteEmployee(Employee:Employee) {
    return this.http.request<Employee>('delete',`${baseUrl}/employee`,{body:Employee, headers:this.header});
  }

}
