import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyIntercepInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const newClonerequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(newClonerequest);
    console.log(next);
    console.log(newClonerequest.headers);
    console.log(newClonerequest.body);
    console.log(newClonerequest.url);
    console.log(newClonerequest.method);
    console.log(newClonerequest.params);
    console.log(newClonerequest.responseType);
    console.log(newClonerequest.withCredentials);
    console.log(newClonerequest.reportProgress);
    
    return next.handle(newClonerequest);
  }
}
