import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostComponent } from '../../components/post/post.component';
import { Post } from '../../models/Post';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/Post.service';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/UserService';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone:true,
  styleUrl: './user-profile.component.css',
   imports: [NavbarComponent, NgFor, PostComponent, ButtonComponent, UserCardComponent]
})
export class UserProfileComponent implements OnInit,OnDestroy{

posts:Post[]=[]
user:User
page=0
subscriptions:Map<string,Subscription>
constructor(private postService:PostService,private activatedRouter:ActivatedRoute,private userService:UserService){
  this.subscriptions=new Map<string,Subscription>()
  
}
ngOnInit(): void {
  this.subscriptions.set("routeParams",this.activatedRouter.params.subscribe((params)=>{
   
    this.subscriptions.set("user",this.userService.getUser(params['id']).subscribe((user)=>{
       this.posts=[]
      this.user=user
       this.getPosts()
    }))
  }))

}
getPosts(){
  this.subscriptions.get("posts")?.unsubscribe()
  this.subscriptions.set("posts",this.postService.getPostsByUseId(this.user.profileId,this.page).subscribe((posts)=>{
    this.posts.push(...posts)
  }))
}
ngOnDestroy(): void {
  for(let sub of this.subscriptions.values()){
    sub.unsubscribe()
  }
}
}
