import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostComponent } from '../../components/post/post.component';
import { Post } from '../../models/Post';
import { Subscription } from 'rxjs';
import { PostService } from '../../core/services/Post.service';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/UserService';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone:true,
  styleUrl: './user-profile.component.css',
   imports: [NavbarComponent, NgFor, PostComponent, CommonModule, UserCardComponent]
})
export class UserProfileComponent implements OnInit,OnDestroy{

posts:Post[]=[]
profile:Profile
isSet:boolean=false
page=0
subscriptions:Map<string,Subscription>
constructor(private postService:PostService,private activatedRouter:ActivatedRoute,private profileService:ProfileService){
  this.subscriptions=new Map<string,Subscription>()
  
}
ngOnInit(): void {
  this.subscriptions.set("routeParams",this.activatedRouter.params.subscribe((params)=>{
      console.log(params)
    this.subscriptions.set("user",this.profileService.getProfile(params['id']).subscribe((profile)=>{
       this.posts=[]
      
      this.profile=profile
      this.isSet=true
       this.getPosts()
    }))
  }))

}
getPosts(){

  this.subscriptions.get("posts")?.unsubscribe()
  this.subscriptions.set("posts",this.postService.getPostsByUseId(this.profile.id,this.page).subscribe((posts)=>{
    this.posts.push(...posts)
  }))
}
ngOnDestroy(): void {
  for(let sub of this.subscriptions.values()){
    sub.unsubscribe()
  }
}
}
