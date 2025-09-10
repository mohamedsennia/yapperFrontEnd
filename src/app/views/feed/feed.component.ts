import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../core/services/Post.service';
import { Post } from '../../models/Post';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgFor } from '@angular/common';
import { PostComponent } from '../../components/post/post.component';
import { InputComponent } from "../../components/input/input.component";
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.css',
    standalone: true,
    imports: [NavbarComponent, NgFor, PostComponent, InputComponent,ButtonComponent,FormsModule]
})
export class FeedComponent implements OnInit,OnDestroy{
  posts:Post[]
  private subscriptions:Map<string,Subscription>
  newPostContent:string
  constructor(private postService:PostService){
    this.posts=[]
    this.subscriptions=new Map<string,Subscription>()
  }
 
  ngOnInit(): void {
    this.newPostContent=""
   this.getPosts()

  }
  getPosts(){
    this.subscriptions.get("posts")?.unsubscribe()
     this.subscriptions.set("posts",
      this.postService.getPosts().subscribe((posts)=>{
        this.posts=posts
      })
    )
  }
  sendPost(){

    if(this.newPostContent.trim()!=""){
      
     
     this.subscriptions.set("newPost",this.postService.post(this.newPostContent).subscribe((post=>{
      
    
      this.posts.unshift(post)
      this.newPostContent=""
     })))
    }
  }
   ngOnDestroy(): void {
    for(let key of this.subscriptions.keys()){
      this.subscriptions.get(key).unsubscribe() 
    }
  }
  
}
