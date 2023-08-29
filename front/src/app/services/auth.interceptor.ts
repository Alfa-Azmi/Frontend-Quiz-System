// import { Injectable } from "@angular/core";
// import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { LoginService } from "./login.service";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private login: LoginService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Add the jwt token (LocalStorage) to the request
//     const token = this.login.getToken();
//     console.log('inside interceptor');

//     if (token !== null) {
//       // Use backticks (```) for string interpolation
//       const authReq = req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` },
        
//       });
//       console.log(authReq);
//       return next.handle(authReq);
//     }

//     // If token is null, proceed with the original request
//     return next.handle(req);
//   }
// }

// export const authInterceptorProviders = [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true,
//     },
//   ];

// import { Injectable } from '@angular/core';
// import {
//     HTTP_INTERCEPTORS,
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoginService } from './login.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private loginService: LoginService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // Get the authentication token from the login service
//     const accessToken = this.loginService.getToken();
//      console.log('inside interceptor');

//     // Clone the request and add the token to the headers if it exists
//     if (accessToken) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//     }

//     // Continue with the request
//     return next.handle(request);
//   }
// }

// export const authInterceptorProviders = [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true,
//     },
//   ];

import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the authentication token from the login service
    const accessToken = this.loginService.getToken();
    console.log('inside interceptor');
    //console.log(accessToken);
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + accessToken)})

    // Only add the Authorization header if the request is going to the API server
    // if (accessToken && request.url.startsWith('http://localhost:8080/')) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    // }

    // // Continue with the request
    return next.handle(request);

  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
