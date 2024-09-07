import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { map } from "rxjs";

@Injectable({"providedIn":"root"})
export class ApiService{
    private link="https://melodious-prosperity-production.up.railway.app/";
    private apiLink=this.link+"api";
    private user:User;
    constructor(private httpClient:HttpClient){
        if(localStorage.getItem("userId")!=null){
             
          this.user=new User(+localStorage.getItem("userId"),"","","","",localStorage.getItem("userKey"),null)
           
        }else{
            
            this.user=null
        }
      }
      loggIn(user:User){

        return  this.httpClient.post(this.apiLink+"/auth/logIn",{"userEmail":user.getEmail(),"password":user.getPassword()}).pipe(map(param=>{
          
          this.user=user
          this.user.setKey(param['token'])
          this.user.setId(param['id'])
          
          localStorage.setItem("userId",this.user.getId().toString())
          localStorage.setItem("userKey",this.user.getKey())
        }))
      }
      signUp(user:User){
        console.log({
          "firstName":user.getFirstName(),
          "lastName":user.getLastName(),
          "email":user.getEmail(),
          "password":user.getPassword(),
          "role":"User",
          "messagesReceived":[],
          "messagesSent":[]
  
        })
        return this.httpClient.post(this.apiLink+"/auth/signUp",{
          "firstName":user.getFirstName(),
          "lastName":user.getLastName(),
          "email":user.getEmail(),
          "password":user.getPassword(),
          "role":"User",
          "messagesReceived":[],
          "messagesSent":[]
  
        }).pipe(map(param=>{
          this.user=user
          this.user.setKey(param['token'])
          this.user.setId(param['id'])
          
          localStorage.setItem("userId",this.user.getId().toString())
          localStorage.setItem("userKey",this.user.getKey())
        }))
      }
      getOtherUsers(){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.apiLink+"/Utilisateur/getOtherUsers/"+this.user.getId(),{headers:headers_object})
      }
      getConversations(){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.apiLink+"/Utilisateur/getConversations/"+this.user.getId(),{headers:headers_object})
      }
      getUser(id:number){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any>(this.apiLink+"/Utilisateur/getUser/"+id,{headers:headers_object})
      }
      getConversation(user2:number){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.link+"messsages/conversationBetween/"+this.user.getId()+"/"+user2)
      }
      getUsersLike(subName:string){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.apiLink+"/Utilisateur/search/"+this.user.getId()+"/"+subName)
      }
      
}