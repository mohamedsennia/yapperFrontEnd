import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
 commentsShowen:boolean
 @Input() post:Post
 @ViewChild('scrollTarget',{static:false})scrollTarget!:ElementRef
 constructor(){
  this.commentsShowen=false
 }
 showComments(){
  this.commentsShowen=true
   setTimeout(() => {
    this.scrollTarget?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'end'
    });
  });
 }
}
