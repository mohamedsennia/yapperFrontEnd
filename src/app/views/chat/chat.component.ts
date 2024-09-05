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
    this.targetUser=null
  }
  ngOnInit(): void {
  this.subscribtions.push(
    this.userService.getConversations().subscribe(contacts=>{
     
      this.contacts=contacts
      this.subscribtions.push(this.activatedRoute.params.subscribe((params)=>{
        
        if(params['id']==0){
           if(!(contacts.length>0)){
        return 0
      }
          this.router.navigate(['/conversation/'+contacts[0].getId()])// to be changed for last conversation
        }
      
          this.subscribtions.push(
            this.userService.getUser(+params['id']).subscribe(user=>{
           
              
              this.targetUser=user
            })
          )
       
        for(let contact of contacts){
          if(contact.getId()==+params['id']){
            this.targetUser=contact
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
            this.subscribtions.push(this.messageSerivce.messageNotification.subscribe(()=>{
              this.resortConversation()
            }))
            
          })
        )
        return 1
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
  this.subscribtions.push(
    this.userService.getConversations().subscribe(contacts=>{
      this.contacts=contacts
         })
  )
  }
  search(){
    if(this.searchString!=""){
      this.subscribtions.push(
        this.userService.getUsersLike(this.searchString.toLowerCase()).subscribe(contacts=>{
          this.contacts=contacts
          console.log(contacts  )
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
