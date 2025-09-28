import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { UserService } from './UserService';
import { Message } from '../../models/Message';
import { MessageService } from './Message.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  connected:Subject<boolean>
  constructor(private userService:UserService,private messageService:MessageService) {
    let userDetails:any=JSON.parse(localStorage.getItem("userDetails"))
    this.connected=new Subject<boolean>()
if(userDetails){
    let token=userDetails["userKey"]
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/messenger'),
       connectHeaders: {
    Authorization: `Bearer ${token}`
      }, // Use SockJS as fallback
      onConnect: () => {
          this.connected.next(true)
        this.client.subscribe("/user/"+this.userService.getProfileId(),(message)=>{
          console.log("new message "+message)
         
        })
      },
      debug: (str) => {
        console.log(new Date(), str);
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
      console.log("a")
      this.client.subscribe("/conversation/"+conversationId,message=>{
      console.log(message)
      
    })
    }
  }
  sendMessage(message:Message){
    if(this.client.connected){
      this.client.publish({"destination":"/app/chat","body":JSON.stringify({
          "profileId":this.userService.getProfileId(),
          "content":message.content,
          "conversationId":message.conversationId
      })})
    }

  }
}
