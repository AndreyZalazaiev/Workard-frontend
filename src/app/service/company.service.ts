import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../../environments/environment';
import {Company} from '../../domain/company';
import {HotSpot} from '../../domain/DTO/hotSpot';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  token = localStorage.getItem('token');
  header = {Authorization: `Bearer ${this.token}`};
  contentHeader = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {
    let tempLang =localStorage.getItem('lang')

  }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}/company${this.getLang()}`, {headers: this.header});
  }
  public getHotSpots(idCompany:number): Observable<HotSpot[]> {
    return this.http.get<HotSpot[]>(`${baseUrl}/visit/hotspot?idCompany=`+idCompany+'&'+this.getLang(),
      {headers: this.contentHeader.append('Authorization',`Bearer ${this.token}`)});
  }
  public createCompany(Company: Company): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/company`, Company, {headers: this.header});
  }
  public deleteCompany(Company: Company) {
    return this.http.request<Company>('delete',`${baseUrl}/company`,{body:Company, headers:this.header});
  }
  public getLang(){
    if(localStorage.getItem('lang').length>0){
      return '?lang='+localStorage.getItem('lang');
    }
    return '?lang=en'
  }
}
