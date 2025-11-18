import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Conversation } from '../../models/Conversation';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/Message';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../core/services/Message.service';
import { WebSocketService } from '../../core/services/WebSocket.service';
import { ConversationService } from '../../core/services/conversation.service';



@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
  standalone:true,
  imports: [CommonModule,FormsModule]
})
export class ConversationComponent implements OnInit{
  @Input() conversation:Conversation
  @Input() index:number
  
  messageContent:string=""
  constructor(private messageService:MessageService,private webSocketService:WebSocketService,private conversationService:ConversationService){
    
  }
  ngOnInit(): void {
   
  }
  sendMessage(){
    if(this.messageContent!=""){
    let message=new Message(0,this.messageContent,new Date(),true,this.conversation.id,this.conversation.targetId)
    
    this.conversation.messages.unshift(message)
    this.webSocketService.sendMessage(message)
    if(this.conversation.id==-1){
      this.conversationService.refreshConversations()
    }
    this.messageContent=""
    
    }
  }
  close(){
    this.conversationService.closeConversation(this.index)
  }

}
