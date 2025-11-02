import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpClient } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
let userDetails:any=JSON.parse(localStorage.getItem("userDetails"))
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

  return next(req)
  .pipe(
    catchError((err:HttpErrorResponse)=>{
      
      return http.post<any>("http://localhost:8080/api/auth/refresh",{},{withCredentials:true}).pipe(
        
        switchMap(res=>{
          console.log(res)
          if(userDetails){
            userDetails["userKey"]=res.token;
            localStorage.setItem("userDetails",JSON.stringify(userDetails));
          }
         
          const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.token}` }
            });
            return next(newReq);
        }),
      )
   
  })
)

}