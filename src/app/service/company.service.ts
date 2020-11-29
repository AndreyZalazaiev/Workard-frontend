import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../../environments/environment';
import {Company} from '../../domain/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  token = localStorage.getItem('token');
  header = {Authorization: `Bearer ${this.token}`};

  constructor(private http: HttpClient) {
  }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}/company`, {headers: this.header});
  }

  public createCompany(Company: Company): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/company`, Company, {headers: this.header});
  }
}
