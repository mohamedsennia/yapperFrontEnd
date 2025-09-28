import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { PostService } from '../../../core/services/Post.service';
import { Post } from '../../../models/Post';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { PostComponent } from '../../../components/post/post.component';
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from '../../../components/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.css',
    standalone: true,
    imports: [NavbarComponent, NgFor, PostComponent, InputComponent,ButtonComponent,FormsModule,CommonModule]
})
export class FeedComponent implements OnInit,OnDestroy,AfterViewChecked{
  posts:Post[]
  private subscriptions:Map<string,Subscription>
  newPostContent:string
  page:number
  reachedLast:boolean
  @ViewChild('loadTrigger',{static:false})loadTrigger!:ElementRef
  private observer!: IntersectionObserver;
  constructor(private postService:PostService){
    this.posts=[]
    this.subscriptions=new Map<string,Subscription>()
    this.page=0;
    this.reachedLast=true
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
    this.newPostContent=""
   this.getPosts()

  }
  getPosts(){

    this.subscriptions.get("posts")?.unsubscribe()
     this.subscriptions.set("posts",
      this.postService.getPosts(this.page).subscribe((data)=>{
        let posts=data['data']

        this.reachedLast=data['last']
        this.posts.push(...posts)
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
  nextPage(){
    this.page=this.page+1
    this.getPosts()
  }
   ngOnDestroy(): void {
    for(let key of this.subscriptions.keys()){
      this.subscriptions.get(key).unsubscribe() 
    }
  }
  
}
