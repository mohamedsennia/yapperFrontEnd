import { Injectable } from "@angular/core";
import { map, Observable, of, Subscription } from "rxjs";
import { Post } from "../../models/Post";
import { PostTypes } from "../../enums/PostTypes";
import { Profile } from "../../models/Profile";

import { ResponseItem } from "../../models/response.interface";
import { UserService } from "./UserService";
import { ConnectionService } from "./connection.service";
import { ResponseItemPage } from "../../models/front.models/ResposnsePageItem";

@Injectable({providedIn:"root"})

export class PostService{
    comments:Post[]
    size:number
    page:number
    last:boolean
    constructor(private connectionService:ConnectionService,private userService:UserService){
        this.size=4
        this.comments=[]
        this.page=0
        this.last=false
    }
    
    getPosts(page:number):Observable<ResponseItemPage<Post>>{

     return   this.connectionService.get("post/feed/"+page).pipe(map((data)=>{
      
        let posts:Post[]=[]
        for(let post of data['content']){
          

           
           let profile=post.profile
           posts.push(new Post(post.id,post.content,new Date(post.date),post.type,new Profile(profile.id,profile.profileName,profile.ownerId),post.commentsCount,post.likesCount,post.liked))
        }
       
        return new ResponseItemPage<Post>(posts,data['last'])
     }))

    }
    post(content:string){
      let obj={
         
          "content":content,
          "postType":PostTypes.Post
        
      }
return         this.connectionService.post<any>("post",obj).pipe(map(post=>{

       return new Post(post.id,post.content,new Date(post.date),post.type,new Profile(post.profile.id,post.profile.profileName,post.profile.ownerId),post.commentsCount,post.likesCount,post.liked)
        
    }))

    }
    comment(content:string,postId:number){
        
   let obj={
         
          "content":content,
          "postType":PostTypes.Reply,
          "parent":postId
        
      }
     return    this.connectionService.post<any>("post",obj).pipe(map(post=>{
       return new Post(post.id,post.content,new Date(post.date),post.type,new Profile(post.profile.id,post.profile.profileName,post.profile.ownerId),post.commentsCount,post.likesCount,post.liked)
        
    }))
    }
    getComments(page:number,postId:number):Observable<ResponseItem<Post>>{

         return   this.connectionService.get("post/comments/"+postId+"/"+page).pipe(map((data)=>{
           
        let comments:Post[]=[]
        for(let post of data['content']){
          

           
           let profile=post.profile
           comments.push(new Post(post.id,post.content,new Date(post.date),post.type,new Profile(profile.id,profile.profileName,profile.ownerId),post.commentsCount,post.likesCount,post.liked))
        }
        return {
                items:comments,
                last:data['last'],
                totalPages:data['totalPages'],
                totalElement:data['totalElements']
            }
     }))
    }
    like(postId:number){
  
      return  this.connectionService.patch("post/toggleLike/"+postId,null)
    }
    getPostsByUseId(profileId:number,page:number){
   return   this.connectionService.get("post/byProfile/"+profileId+"/"+page).pipe(map((data)=>{
     
        let posts:Post[]=[]
        for(let post of data['content']){
          

           
           let profile=post.profile
      
           posts.push(new Post(post.id,post.content,new Date(post.date),post.type,new Profile(profile.id,profile.profileName,profile.ownerId),post.commentsCount,post.likesCount,post.liked))
        }
        return posts
     }))
    }

}