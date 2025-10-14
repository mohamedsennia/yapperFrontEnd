import { CommonModule, NgFor } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PostComponent } from '../../../components/post/post.component';
import { Post } from '../../../models/Post';
import { Subscription } from 'rxjs';
import { PostService } from '../../../core/services/Post.service';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/UserService';
import { UserCardComponent } from "../../../components/user-card/user-card.component";
import { ProfileService } from '../../../core/services/profile.service';
import { Profile } from '../../../models/Profile';
import { ConversationComponent } from "../../../components/conversation/conversation.component";
import { Conversation } from '../../../models/Conversation';
import { MessageService } from '../../../core/services/Message.service';
import { ConversationService } from '../../../core/services/conversation.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone:true,
  styleUrl: './user-profile.component.css',
   imports: [ NgFor, PostComponent, CommonModule, UserCardComponent, ]
})
export class UserProfileComponent implements OnInit,OnDestroy,AfterViewChecked{

posts:Post[]=[]
profile:Profile
isSet:boolean=false
page=0
 reachedLast:boolean
subscriptions:Map<string,Subscription>
conversations:Conversation[]
 @ViewChild('loadTrigger',{static:false})loadTrigger!:ElementRef
 private observer!: IntersectionObserver;
constructor(private postService:PostService,private activatedRouter:ActivatedRoute,private profileService:ProfileService,private messageServices:MessageService,private conversationService:ConversationService){
  this.subscriptions=new Map<string,Subscription>()
  this.reachedLast=false;
}
  ngAfterViewChecked(): void {
       if (this.loadTrigger && !this.observer) {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.nextPage();
      }
    });
    this.observer.observe(this.loadTrigger.nativeElement);
  }
  }
ngOnInit(): void {
  this.subscriptions.set("routeParams",this.activatedRouter.params.subscribe((params)=>{
   
    this.subscriptions.set("user",this.profileService.getProfile(params['id']).subscribe((profile)=>{
       this.posts=[]
      
      this.profile=profile
      console.log(profile)
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
nextPage(){
  this.page=this.page+1
  this.getPosts()
}
ngOnDestroy(): void {
  for(let sub of this.subscriptions.values()){
    sub.unsubscribe()
  }
}
openConversation(){

  if(this.profile.conversationId==-1){
   
    this.conversationService.addConversation(new Conversation(-1,[],this.profile.profileName,true,this.getTargetId()))
    
  }else{
    this.messageServices.getMessagesByConversationId(this.profile.conversationId).subscribe((messages)=>{
      this.conversationService.openConversation(this.profile.conversationId,messages)
      
    })
  }
}
  
getTargetId(){

  return this.profile.id
}
}
