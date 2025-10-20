import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { UserService } from './UserService';
import { Message } from '../../models/Message';
import { MessageService } from './Message.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConversationService } from './conversation.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  connected:Subject<boolean>
  notifications:Subject<number>
  constructor(private userService:UserService,private messageService:MessageService,private messageServices:MessageService) {
    let userDetails:any=JSON.parse(localStorage.getItem("userDetails"))
    this.connected=new Subject<boolean>()
    this.notifications=new Subject<number>()
if(userDetails){
    let token=userDetails["userKey"]
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/messenger'),
       connectHeaders: {
    Authorization: `Bearer ${token}`
      }, // Use SockJS as fallback
      onConnect: () => {
          this.connected.next(true)
                 console.log(this.userService.getProfileId())
        this.client.subscribe("/user/notification/messages",(message)=>{
   
          let messageBody=JSON.parse(message.body)
          if(messageBody.type=="NewConversation"){
            this.notifications.next(+messageBody.content)
          }
          console.log(messageBody)
          // 
         
        })
      },
      debug: (str) => {
        
      },
      reconnectDelay: 5000, // Automatically reconnect after 5 seconds
    });

}


this.client.activate();
  //   
  // }
  // sendMessage(message:Message){
  //   if(this.client.connected){
  //       this.client.publish({"destination":"/app/chat","body":JSON.stringify(message)})
  //   }else{
  //       console.log("not yet")
  //   }
   
  }
  subscribe(conversationId:number){
    if(this.client.connected){
      
      this.client.subscribe("/conversation/"+conversationId,message=>{
      let messageBody=JSON.parse(message.body)

     
      
    })
    }
  }
  sendMessage(message:Message){
    if(this.client.connected){
      this.client.publish({"destination":"/app/chat","body":JSON.stringify({
          "profileId":this.userService.getProfileId(),
          "content":message.content,
          "conversationId":message.conversationId,
          "targetId":message.targetId
      })})
    }

  }
}
