import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { map, Observable, Subscription } from "rxjs";
import { PostTypes } from "../enums/PostTypes";

@Injectable({"providedIn":"root"})
export class ApiService{
  
    private link="http://localhost:8080/";
    private apiLink=this.link+"api";
    private user:User;
    constructor(private httpClient:HttpClient){
        if(localStorage.getItem("userId")!=null){
             
          this.user=new User(+localStorage.getItem("userId"),undefined,undefined,undefined,undefined,undefined,localStorage.getItem("userKey"))
           
        }else{
            
            this.user=null
        }
      }
      loggIn(user:User){

        return  this.httpClient.post(this.apiLink+"/auth/logIn",{"userEmail":user.getEmail(),"password":user.getPassword()}).pipe(map(param=>{
         
          this.user=user
   
          this.user.setKey(param['token'])
          this.user.setId(param['id'])
          this.user.profileId=param['profileId']
          localStorage.setItem("userName",param['userName'])
          localStorage.setItem("userId",this.user.getId().toString())
          localStorage.setItem("userKey",this.user.getKey())
        }))
      }
      signUp(user:User){
       
        return this.httpClient.post(this.apiLink+"/auth/signUp",{
          "firstName":user.getFirstName(),
          "lastName":user.getLastName(),
          "email":user.getEmail(),
          "password":user.getPassword(),

  
        }).pipe(map(param=>{
          this.user=user
          this.user.setKey(param['token'])
          this.user.setId(param['id'])
          this.user.profileId=param['profileId']
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
        return this.httpClient.get<any>(this.apiLink+"/Utilisateur/"+id,{headers:headers_object})
      }
      getConversation(user2:number){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.link+"messsages/conversationBetween/"+this.user.getId()+"/"+user2)
      }
      getUsersLike(subName:string){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.apiLink+"/Utilisateur/search/"+subName)
      }
      getFeed(page:number){

        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.apiLink+"/post/feed/"+page,{headers:headers_object})
      }
      newPost(content:string):Observable<any>{
        
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.post(this.apiLink+"/post",{
          "content":content,
          "postType":PostTypes.Post
        },{headers:headers_object})
      }
       newComment(content:string,parentId:number):Observable<any>{
       let body={
          "content":content,
          "postType":PostTypes.Reply,
          "parent":parentId
        }

        var headers_object = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.post(this.apiLink+"/post",body,{headers:headers_object})
      }
       getComments(page:number,postId:number){
     
          var headers_object = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer `+this.user.getKey());
        
          return this.httpClient.get(this.apiLink+"/post/comments/"+postId+"/"+page,{headers:headers_object})
         }
      like(postId:number){
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.patch(this.apiLink+"/post/toggleLike/"+postId,null,{headers:headers_object})
      }
      getPostsByUseId(profileId:number,page:number){
         var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.get<any[]>(this.apiLink+"/post/byProfile/"+profileId+"/"+page,{headers:headers_object})
      }
      toggleFollow(id: number) {
        var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer `+this.user.getKey());
        return this.httpClient.put<any[]>(this.apiLink+"/profile/toggleFollow/"+this.user.profileId+"/"+id,null,{headers:headers_object})
      }
      
}