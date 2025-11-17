import { Injectable } from "@angular/core";
import { User } from "../../models/User";

import { BehaviorSubject, map, Subscription } from "rxjs";
import { Message } from "../../models/Message";
import { SuggestionItem } from "../../models/front.models/SuggestionItem";
import { ConnectionService } from "./connection.service";
import { Router } from "@angular/router";


@Injectable({
    "providedIn":"root"
})
export class UserService{
 private user:User
 refreshed:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
 private refreshSubscription:Subscription
 constructor(private connectionService:ConnectionService,private router:Router){

   let userDetails:any=localStorage.getItem("userDetails")
        if(userDetails!=null){
             userDetails=JSON.parse(userDetails)
       this.user=new User(+userDetails.userId,undefined,undefined,undefined,+userDetails.profileId,undefined,userDetails.userKey)
         this.refreshSubscription= this.connectionService.post("auth/refresh",{}).subscribe(()=>{
            this.refreshed.next(true)
            this.refreshSubscription.unsubscribe()
          })
   
}else{
    
    this.user=null
}
 }
 getCurrentId(){
  return this.user.getId()
 }
 getUserName(){
 
    return JSON.parse(localStorage.getItem("userDetails"))["userName"]
 }
 isLoggedIn(){
    return this.user!=null
 }
 loggIn(user:User){

 
   return this.connectionService.post("auth/logIn",{"userEmail":user.getEmail(),"password":user.getPassword()}).pipe(map(param=>{
        
            this.user=new User(param['userId'],undefined,undefined,undefined,param['profileId'],undefined,param['token'])
          
            let userDetails={
              "userName":param['userName'],
              "userId":param['userId'],
              "userKey":param['token'],
              "profileId":param["profileId"]
            }
            localStorage.setItem("userDetails",JSON.stringify(userDetails))

           return this.user
        }))
 }
 signUp(user:User){
  
return  this.connectionService.post("auth/signUp",{
          "firstName":user.getFirstName(),
          "lastName":user.getLastName(),
          "email":user.getEmail(),
          "password":user.getPassword(),

  
        }).pipe(map(param=>{
                     this.user=new User(param['userId'],undefined,undefined,undefined,param['profileId'],undefined,param['token'])
          
            let userDetails={
              "userName":param['userName'],
              "userId":param['userId'],
              "userKey":param['token'],
              "profileId":param["profileId"]
            }
            localStorage.setItem("userDetails",JSON.stringify(userDetails))
            return this.user
        }))
 }
 logOff(){
  localStorage.clear()
   this.user=null
  this.router.navigate(['/login'])
 }
 getProfileId(){
 
  return this.user.profileId
 }
}