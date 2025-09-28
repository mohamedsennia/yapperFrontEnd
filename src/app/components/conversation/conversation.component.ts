import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Conversation } from '../../models/Conversation';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/Message';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../core/services/Message.service';
import { WebSocketService } from '../../core/services/WebSocket.service';



@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
  standalone:true,
  imports: [CommonModule,FormsModule]
})
export class ConversationComponent {
  @Input() conversation:Conversation
  @Input() target:number
  messageContent:string
  constructor(private messageService:MessageService,private webSocketService:WebSocketService){}
  sendMessage(){
    if(this.messageContent!=""){
    let message=new Message(0,this.messageContent,new Date(),true,this.conversation.id,this.target)
    this.conversation.messages.unshift(message)
    this.webSocketService.sendMessage(message)
    this.messageContent=""
    
    }
  }

}
