import { Component, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/Post.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrl: './reply.component.css',
    standalone: true
})
export class ReplyComponent {
@Input() reply!:Post
    constructor(private postService:PostService){
        
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
  this.postService.like(this.reply.id)
  if(this.reply.liked){
    this.reply.likesCount--
  }else{
    this.reply.likesCount++
  }
  this.reply.liked=!this.reply.liked
 }
}
