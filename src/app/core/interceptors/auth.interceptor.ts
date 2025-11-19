import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";
import { environment } from "../../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  let userDetails: any = JSON.parse(localStorage.getItem("userDetails"));
  let apiURL = environment.apiBaseUrl + "/api";
  const http = inject(HttpClient);

  // Do not intercept auth endpoints
  if (req.url.includes("/auth")) {
    return next(req);
  }

  // Attach token
  if (userDetails) {
    let token = userDetails["userKey"];
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {

      // Try refresh token
      return http.post<any>(apiURL + "/auth/refresh", {}, { withCredentials: true }).pipe(
        switchMap(res => {

          // Save new token
          if (userDetails) {
            userDetails["userKey"] = res.token;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
          }

          const newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${res.token}` }
          });

          return next(newReq);
        }),

        // If refresh fails → logout and swallow error
        catchError(() => {
          localStorage.removeItem("userDetails");
          window.location.href = '/login';
          return EMPTY; // swallow → no console logs
        })
      );
    })
  );
};
