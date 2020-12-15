import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../../environments/environment';
import {User} from '../../domain/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(data): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data, {responseType: 'text'});
  }
  public register(data): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data, {responseType: 'json'});
  }
  public obtainProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    if (token != null) {
      const header = {Authorization: `Bearer ${token}`};
      return this.http.get<User>(`${baseUrl}/profile`, {headers: header});
    }
  }

}
