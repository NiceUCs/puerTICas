import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './user-interface';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  /*httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': JSON.parse(localStorage.getItem('x-access-token')) }),
  };*/
  private url = 'users/create';

  constructor(private http: HttpClient) {}

  /**
   * POST a user
   * @param user interface of user defined in /management/user-interface.ts
   * @returns JSON with correct or incorrect status
   */
  createUser(user: any): Observable<any> {
    const prms1 = JSON.stringify({
      email: user.email,
      dni: user.dni,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      born: user.born,
      image: user.image,
    });
    return of('dummy').pipe(delay(1000));
    //return this.http.post<any>(this.url + '/agregar', prms1/*, this.httpOptions*/);
  }

  /**
   * GET all users information from table ACCESS
   * @param -
   * @returns for all the users: email, dni, name, surname, phone, born and image
   */
  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/assets/data/users.json');
    //return this.http.get<any>(this.url + '/agregar', prms1/*, this.httpOptions*/);
  }

  /**
   * POST a user
   * @param user interface of user defined in /management/user-interface.ts
   * @returns JSON with correct or incorrect status
   */
  deleteUser(user: any): Observable<any> {
    const prms1 = JSON.stringify({
      email: user.email,
      dni: user.dni,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      born: user.born,
      image: user.image,
    });
    return of('dummy').pipe(delay(1000));
    //return this.http.delete<any>(this.url + '/agregar', prms1/*, this.httpOptions*/);
  }
}
