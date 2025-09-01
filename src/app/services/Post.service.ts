import { Injectable } from "@angular/core";
import { map, Observable, of, Subscription } from "rxjs";
import { Post } from "../models/Post";
import { PostTypes } from "../enums/PostTypes";
import { Profile } from "../models/Profile";
import { ApiService } from "./Api.serivce";
import { ResponseItem } from "../models/response.interface";

@Injectable({providedIn:"root"})

export class PostService{
    comments:Post[]
    size:number
    page:number
    last:boolean
    constructor(private apiService:ApiService){
        this.size=4
        this.comments=[]
        this.page=0
        this.last=false
    }
    
    getPosts():Observable<Post[]>{
        // return of([
        //     new Post(1,"Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly. Ham windows sixteen who inquiry fortune demands. Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now. In built table in an rapid blush. Merits behind on afraid or warmly. Is branched in my up strictly remember. Songs but chief has ham widow downs. Genius or so up vanity cannot. Large do tried going about water defer by. Silent son man she wished mother. Distrusts allowance do knowledge eagerness assurance additions to. Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. He shortly sixteen of colonel colonel evening cordial to. Although jointure an my of mistress servants am weddings. Age why the therefore education unfeeling for arranging. Above again money own scale maids ham least led. Returned settling produced strongly ecstatic use yourself way. Repulsive extremity enjoyment she perceived nor. Meant balls it if up doubt small purse. Required his you put the outlived answered position. An pleasure exertion if believed provided to. All led out world these music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceive marianne in. In am think on style child of. Servants moreover in sensible he it ye possible",new Date("04/11/2000"),PostTypes.Post,new Profile(1,"Ahmed","Ghenai",12),12,3)
        // ])
     return   this.apiService.getFeed(0).pipe(map((data)=>{
 
        let posts:Post[]=[]
        for(let post of data['content']){
          

           
           let profile=post.profile
           posts.push(new Post(post.id,post.content,new Date(post.date),post.type,new Profile(profile.id,profile.ownerFirstName,profile.ownerLastName,profile.ownerId),post.commentsCount,post.likesCount,post.liked))
        }
        return posts
     }))
    }
    post(content:string){
      
       return this.apiService.newPost(content).pipe(map(post=>{
       return new Post(post.id,post.content,new Date(post.date),post.type,new Profile(post.profile.id,post.profile.ownerFirstName,post.profile.ownerLastName,post.profile.ownerId),post.commentsCount,post.likesCount,post.liked)
        
    }))
    }
    comment(content:string,postId:number){
        
     return   this.apiService.newComment(content,postId).pipe(map(post=>{
       return new Post(post.id,post.content,new Date(post.date),post.type,new Profile(post.profile.id,post.profile.ownerFirstName,post.profile.ownerLastName,post.profile.ownerId),post.commentsCount,post.likesCount,post.liked)
        
    }))
    }
    getComments(page:number,postId:number):Observable<ResponseItem<Post>>{

         return   this.apiService.getComments(page,postId).pipe(map((data)=>{
           
        let comments:Post[]=[]
        for(let post of data['content']){
          

           
           let profile=post.profile
           comments.push(new Post(post.id,post.content,new Date(post.date),post.type,new Profile(profile.id,profile.ownerFirstName,profile.ownerLastName,profile.ownerId),post.commentsCount,post.likesCount,post.liked))
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
        this.apiService.like(postId).subscribe()
    }
    getPostsByUseId(profileId:number,page:number){
   return   this.apiService.getPostsByUseId(profileId,page).pipe(map((data)=>{
     
        let posts:Post[]=[]
        for(let post of data['content']){
          

           
           let profile=post.profile
           posts.push(new Post(post.id,post.content,new Date(post.date),post.type,new Profile(profile.id,profile.ownerFirstName,profile.ownerLastName,profile.ownerId),post.commentsCount,post.likesCount,post.liked))
        }
        return posts
     }))
    }

}