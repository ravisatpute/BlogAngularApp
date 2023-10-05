import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage["token"]; // you probably want to store it in localStorage or something


    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!token) {
      return next.handle(req);
    }

 

    return next.handle(req);
  }

}