import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   // auth.interceptor.ts
intercept(req: HttpRequest<any>, next: HttpHandler) {

  if (
    req.url.includes('/user/login') ||
    req.url.includes('/user/register')
  ) {
    return next.handle(req);
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return next.handle(req);
  }

  return next.handle(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
}

  
}
