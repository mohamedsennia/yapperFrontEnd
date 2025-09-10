import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
let userDetails:any=JSON.parse(localStorage.getItem("userDetails"))
if(userDetails){
    let token=userDetails["userKey"]
 if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

}
  return next(req)
}