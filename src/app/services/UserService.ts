import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { ApiService } from "./Api.serivce";
import { map } from "rxjs";
import { Message } from "../models/message";


@Injectable({
    "providedIn":"root"
})
export class UserService{
 private user:User
 constructor(private apiService:ApiService){
  if(localStorage.getItem("userId")!=null){
       
  this.user=new User(+localStorage.getItem("userId"),"","","","",localStorage.getItem("userKey"),null)
   
}else{
    
    this.user=null
}
 }
 getCurrentId(){
  return this.user.getId()
 }
 isLoggedIn(){
    return this.user!=null
 }
 loggIn(user:User){
   this.user=user
  
   return this.apiService.loggIn(user)
 }
 signUp(user:User){
  this.user=user
  return this.apiService.signUp(user);
 }
 logOff(){
  localStorage.clear()
   this.user=null
 }
 getOtherUsers(){
 return this.apiService.getOtherUsers().pipe(map(users=>{
 
  let contacts:User[]=[]
  for(let user of users){
    let message:Message=null;
    if(user['messageDTO']!=null){
      message=new Message(user['messageDTO']['id'],user['messageDTO']['content'],new Date(user['messageDTO']['time']),user['messageDTO']['senderId'],user['messageDTO']['recipientId'])
    }
    contacts.push(new User(user['id'],user['firstName'],user['lastName'],"","","",message))
  }
  
  return contacts
 }));
 }
 getConversations(){
  return this.apiService.getConversations().pipe(map(users=>{
 
    let contacts:User[]=[]
    for(let user of users){
      let message:Message=null;
      if(user['messageDTO']!=null){
        message=new Message(user['messageDTO']['id'],user['messageDTO']['content'],new Date(user['messageDTO']['time']),user['messageDTO']['senderId'],user['messageDTO']['recipientId'])
      }
      contacts.push(new User(user['id'],user['firstName'],user['lastName'],"","","",message))
    }
    
    return contacts
   }));
 }
 getUsersLike(subName:string){
 return this.apiService.getUsersLike(subName).pipe(map(users=>{
 
  let contacts:User[]=[]
  for(let user of users){
    let message:Message=null;
    if(user['messageDTO']!=null){
      message=new Message(user['messageDTO']['id'],user['messageDTO']['content'],new Date(user['messageDTO']['time']),user['messageDTO']['senderId'],user['messageDTO']['recipientId'])
    }
    contacts.push(new User(user['id'],user['firstName'],user['lastName'],"","","",message))
  }
  
  return contacts
 }));
 }
 getUser(id:number){
  
  return this.apiService.getUser(id).pipe(map(user=>{
    let message:Message=null;
    if(user['messageDTO']!=null){
      message=new Message(user['messageDTO']['id'],user['messageDTO']['content'],new Date(user['messageDTO']['time']),user['messageDTO']['senderId'],user['messageDTO']['recipientId'])
    }
   return new User(user['id'],user['firstName'],user['lastName'],"","","",message)
  }))
 }
}