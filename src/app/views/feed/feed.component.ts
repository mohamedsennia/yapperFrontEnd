import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/Post.service';
import { Post } from '../../models/Post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit,OnDestroy{
  posts:Post[]
  private subscriptions:Map<string,Subscription>
  constructor(private postService:PostService){
    this.posts=[]
    this.subscriptions=new Map<string,Subscription>()
  }
 
  ngOnInit(): void {
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
   ngOnDestroy(): void {
    for(let key of this.subscriptions.keys()){
      this.subscriptions.get(key).unsubscribe() 
    }
  }
}
