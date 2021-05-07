import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Access } from './access-interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': JSON.parse(localStorage.getItem('x-access-token')),
    }),
  };
  private url = '/dashboard';

  constructor(private http: HttpClient) {}

  /**
   * GET all users information from table ACCESS
   * @param -
   * @returns for all the users: email, name, surname and access date
   */
  getAccess(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/assets/data/access.json');
    //return this.http.get<any>(this.url + '/access', prms1, this.httpOptions);
  }
}
