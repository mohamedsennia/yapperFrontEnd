import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/Post';
import { CommonModule, NgIf } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { ReplyComponent } from '../reply/reply.component';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/services/Post.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
    standalone: true,
    imports: [NgIf, InputComponent, ReplyComponent,FormsModule,CommonModule,RouterLink]
})
export class PostComponent  implements OnInit, OnDestroy{
 commentsShowen:boolean
 @Input() post:Post
 @ViewChild('scrollTarget',{static:false})scrollTarget!:ElementRef
 newComment:string=""
 comments:Post[]
 last:boolean
  page:number
  private subscriptions:Map<string,Subscription>
 constructor(private postService:PostService){
  this.commentsShowen=false
  this.comments=[]
  this.last=true
  this.page=0
  this.subscriptions=new Map<string,Subscription>()
 }
  ngOnInit(): void {

  }
 
  
 showComments(){
 if(!this.commentsShowen){
   this.commentsShowen=true

  this.getComments()
 }
 }
 formateDate(date:Date){

const now = new Date();

const isToday = date.toDateString() === now.toDateString();

const hours = date.getHours();
const minutes = String(date.getMinutes()).padStart(2, '0');
let formatted = `${hours}h${minutes}`;

if (!isToday) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // e.g. "Aug"
  formatted = `${day} ${month} `+formatted;
}
return formatted
 }
 comment(){
  if(this.newComment.trim()!=""){
    this.subscriptions.set("newPost",this.postService.comment(this.newComment,this.post.id).subscribe((comment=>{
      
    
      this.comments.unshift(comment)
      this.newComment=""
      this.post.commentsCount++
     })))
  }
  
 }
 getComments(){
  this.commentsShowen=true
  this.subscriptions.set("comments",this.postService.getComments(this.page,this.post.id).subscribe((response)=>{
    this.comments.push(...response.items)
    this.last=response.last
    if(!this.last){
      this.page++
    }
  }))
     setTimeout(() => {
    this.scrollTarget?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'end'
    });
  });
 }
like(){
  this.subscriptions.get("like")?.unsubscribe()
  this.subscriptions.set("like",this.postService.like(this.post.id).subscribe())
  if(this.post.liked){
    this.post.likesCount--
  }else{
    this.post.likesCount++
  }
  this.post.liked=!this.post.liked
 }
  ngOnDestroy(): void {
    for(let subscription in this.subscriptions.keys()){
      this.subscriptions.get(subscription).unsubscribe()
    }
  }
}
