import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../core/services/Post.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrl: './reply.component.css',
    imports:[RouterLink],
    standalone: true
})
export class ReplyComponent implements OnInit, OnDestroy{
@Input() reply!:Post
private subscriptions:Map<string,Subscription>
    constructor(private postService:PostService){
          this.subscriptions=new Map<string,Subscription>()
    }

  ngOnInit(): void {
   
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
  like(){
    this.subscriptions.get("like")?.unsubscribe()
this.subscriptions.set("like",  this.postService.like(this.reply.id).subscribe(()=>{
if(this.reply.liked){
    this.reply.likesCount--
  }else{
    this.reply.likesCount++
  }
  this.reply.liked=!this.reply.liked
  }))
  
 }
   ngOnDestroy(): void {
      for(let subscription of this.subscriptions.values()){
        subscription.unsubscribe()
      }
  }
}
