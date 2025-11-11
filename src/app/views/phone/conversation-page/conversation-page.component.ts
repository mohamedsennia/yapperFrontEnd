import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../../core/services/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from '../../../models/Conversation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../core/services/Message.service';
import { Message } from '../../../models/Message';
import { WebSocketService } from '../../../core/services/WebSocket.service';
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrl: './conversation-page.component.css',
  standalone:true,
  imports: [CommonModule, FormsModule, ButtonComponent]
})
export class ConversationPageComponent implements OnInit{
  conversation:Conversation
 
  messageContent:string
  constructor(private conversationService:ConversationService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private webSocketService:WebSocketService){
    
  }
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params)=>{

      if(+params["id"]){
        this.conversationService.conversationsSubject.subscribe(()=>{
              this.conversation=this.conversationService.getConversationById(+params["id"])
              this.messageService.getMessagesByConversationId(this.conversation.id).subscribe(messages=>{
                this.conversation.messages=messages
              })
        })
       
        
      }
      
    })
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


}
