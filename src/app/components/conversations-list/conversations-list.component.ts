import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../core/services/conversation.service';
import { Conversation } from '../../models/Conversation';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/services/Message.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.css',
  standalone:true,
  imports:[CommonModule]
})
export class ConversationsListComponent implements OnInit{
    conversations:Conversation[]
    subscriptions:Map<string,Subscription>
    constructor(private conversationService:ConversationService,private messageService:MessageService){
       this.subscriptions=new Map<string,Subscription>();
    }
  ngOnInit(): void {
    
    this.subscriptions.set("conversations",this.conversationService.conversationsSubject.subscribe((conversations)=>{
    
      this.conversations=conversations
    }))
    
  }
  openConversation(conversation:Conversation){
    this.messageService.getMessagesByConversationId(conversation.id).subscribe((messages)=>{
      this.conversationService.openConversation(conversation.id,messages)
      
    })

  }
}
