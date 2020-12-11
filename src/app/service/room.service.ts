import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {baseUrl} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Room} from '../../domain/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  token = localStorage.getItem('token');
  header = {Authorization: `Bearer ${this.token}`};
  contentHeader = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {
  }
  public createRoom(Room:Room): Observable<Room> {
    return this.http.post<Room>(`${baseUrl}/room`, Room, {headers: this.header});
  }

  public deleteRoom(Room: Room) {
    return this.http.request('delete',`${baseUrl}/room`,{body:Room, headers:this.header});
  }
  public getLang(){
    if(localStorage.getItem('lang').length>0){
      return '?lang='+localStorage.getItem('lang');
    }
    return '?lang=en'
  }
}
