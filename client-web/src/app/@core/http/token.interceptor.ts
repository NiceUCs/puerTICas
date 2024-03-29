import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenizedReq = request.clone({
      setHeaders: {
        authorization: `Bearer ${this.token}`,
      },
    });
    return next.handle(tokenizedReq);
  }

  get token(): string | null {
    const credentials = sessionStorage.getItem('authorization');
    return credentials ? credentials : null;
  }

  /* get token() {
        return this.credentialsService.getCredentials();
    } */
}
