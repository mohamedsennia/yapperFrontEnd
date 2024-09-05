import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { UserService } from './UserService';
import { Message } from '../models/message';
import { MessageService } from './Message.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;

  constructor(private userService:UserService,private messageService:MessageService) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('https://yapper-production.up.railway.app:8080/messenger'), // Use SockJS as fallback
      onConnect: () => {
        this.client.subscribe("/user/"+this.userService.getCurrentId()+"/topic/messages",(message)=>{
         let tempMessage:Message=JSON.parse(message.body)
         
         messageService.addMessage(new Message(tempMessage['id'],tempMessage['content'],new Date(tempMessage['time']),tempMessage['senderId'],tempMessage['recipientId']))
        })
        
      },
      debug: (str) => {
        console.log(new Date(), str);
      },
      reconnectDelay: 5000, // Automatically reconnect after 5 seconds
    });

    this.client.activate();
  }
  sendMessage(message:Message){
    if(this.client.connected){
        this.client.publish({"destination":"/app/chat","body":JSON.stringify(message)})
    }else{
        console.log("not yet")
    }
   
  }
}
