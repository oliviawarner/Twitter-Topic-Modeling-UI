//link to angular documentation on how angualur to intercept requests
//https://angular.io/guide/http#intercepting-requests-and-responses

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthIntercepter implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    const userid = sessionStorage.getItem("user-id");

    return next.handle(req.clone({
      headers: userid?req.headers.append("user-id",userid):req.headers
    }));

  }
}
