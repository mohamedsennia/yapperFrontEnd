import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/UserService';
import { User } from '../../models/User';
import { MessageService } from '../../services/Message.service';
import { Message } from '../../models/message';
import { WebSocketService } from '../../services/WebSocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,OnDestroy{
  private subscribtions:Subscription[]
   contacts:User[]
   conversation:Message[]
    newMessage:string;
    targetUser:User
    searchString:string;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,public userService:UserService,private messageSerivce:MessageService,private socketService:WebSocketService){
    this.subscribtions=[];
    this.contacts=[]
    this.conversation=[]
    this.newMessage="";
    this.searchString=""
  }
  ngOnInit(): void {
  this.subscribtions.push(
    this.userService.getOtherUsers().subscribe(contacts=>{
      this.contacts=contacts
      this.subscribtions.push(this.activatedRoute.params.subscribe((params)=>{
        
        if(params['id']==0){
          this.router.navigate(['/conversation/'+contacts[0].getId()])// to be changed for last conversation
        }
        for(let conatact of contacts){
          if(conatact.getId()==+params['id']){
            this.targetUser=conatact
            break
          }
        }
        this.subscribtions.push(
          this.messageSerivce.getConversation(params['id']).subscribe(conversation=>{
            this.conversation=conversation
            this.subscribtions.push(this.messageSerivce.messagesSubject.subscribe(messages=>{
              this.conversation=messages
             this.resortConversation()
            }))
            
          })
        )
      }))
      
    })
  )
  
  }
  sendMessage(){
   if(this.newMessage){
    //
    let tempMessage=new Message(null,this.newMessage,new Date(),this.userService.getCurrentId(),this.targetUser.getId())
    this.socketService.sendMessage(tempMessage)
    this.messageSerivce.addMessage(tempMessage)
  
    
    this.newMessage="";
   }
  }
  ngOnDestroy(): void {
   for(let subscription of this.subscribtions){
    subscription.unsubscribe();
   }
  }
  resortConversation(){
    for(let i=0;i<this.contacts.length;i++){
      if(this.contacts[i].getId()==this.userService.getCurrentId()||this.targetUser.getId()==this.contacts[i].getId()){
     let tempContact=this.contacts[i]
     this.contacts.splice(i,1)
      tempContact.setMessage(this.conversation[this.conversation.length-1])
     this.contacts.push(tempContact)
     
      }
    }
  }
  search(){
    if(this.searchString!=""){
      this.subscribtions.push(
        this.userService.getUsersLike(this.searchString).subscribe(contacts=>{
          this.contacts=contacts
        })
      )
    }else{
      this.subscribtions.push(
        this.userService.getOtherUsers().subscribe(contacts=>{
          this.contacts=contacts
        })
      )
    }
  }
}
