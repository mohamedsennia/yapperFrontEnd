import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpClient } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { environment } from "../../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
let userDetails:any=JSON.parse(localStorage.getItem("userDetails"))
let apiURL=environment.apiBaseUrl+"/api"
const http=inject(HttpClient)
  if(req.url.includes("/auth")){
    return next(req)
  }
if(userDetails){
    let token=userDetails["userKey"]
 if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

}

 return next(req).pipe(
  catchError((err: HttpErrorResponse) => {
    return http.post<any>(apiURL + "/auth/refresh", {}, { withCredentials: true }).pipe(
      switchMap(res => {
      
        if (userDetails) {
          userDetails["userKey"] = res.token;
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
        }

        const newReq = req.clone({
          setHeaders: { Authorization: `Bearer ${res.token}` }
        });
        return next(newReq);
      }),
      catchError(refreshErr => {
        // Logout logic
        localStorage.removeItem("userDetails");
        // optionally redirect to login
        window.location.href = '/login';
        return throwError(() => refreshErr);
      })
    );
  })
);

}