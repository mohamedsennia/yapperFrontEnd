import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({providedIn:"root"})
export class ConnectionService{
    private apiURL=environment.apiBaseUrl+"/api"
  constructor(private httpClient:HttpClient) { }
  get<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(`${this.apiURL}/${url}`, { params });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.apiURL}/${url}`, body,{withCredentials:true});
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(`${this.apiURL}/${url}`, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiURL}/${url}`);
  }
  patch<T>(url:string,body:any):Observable<T>{
    return this.httpClient.patch<T>(`${this.apiURL}/${url}`,body);
  }
}