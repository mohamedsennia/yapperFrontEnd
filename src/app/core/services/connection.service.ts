import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class ConnectionService{
    private apiURL="http://localhost:8080/api"
  constructor(private httpClient:HttpClient) { }
  get<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(`${this.apiURL}/${url}`, { params });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.apiURL}/${url}`, body);
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