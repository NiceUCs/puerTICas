import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './user-interface';
import { AppComponent } from '@app/app.component';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: sessionStorage.getItem('authorization'),
    }),
  };
  private url = '/admins';

  constructor(private http: HttpClient) {}

  /**
   * POST a user
   * @param user interface of user defined in /management/user-interface.ts
   * @returns JSON with correct or incorrect status
   */
  createUser(user: any): Observable<any> {
    const body = JSON.stringify({
      email: user.email,
      data: user.data,
    });

    return this.http.post<any>(this.url + '/create_user', body, this.httpOptions);
  }
  /**
   * GET all users information from table ACCESS
   * @param -
   * @returns for all the users: email, dni, name, surname, phone, born and image
   */
  getUsers(): Observable<any> {
    return this.http.get<any>(this.url + '/get_users', this.httpOptions);
  }

  /**
   * POST a user
   * @param user interface of user defined in /management/user-interface.ts
   * @returns JSON with correct or incorrect status
   */
  deleteUser(user: any): Observable<any> {
    const body = JSON.stringify({
      email: user.email,
      data: {
        dni: user.dni,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        born: user.born,
        image: user.image,
      },
    });

    return this.http.delete<any>(this.url + '/delete_user/' + user.email, this.httpOptions);
  }
}
