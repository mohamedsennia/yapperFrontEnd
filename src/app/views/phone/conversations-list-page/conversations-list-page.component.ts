import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../models/Conversation';
import { ConversationService } from '../../../core/services/conversation.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversations-list-page',
  templateUrl: './conversations-list-page.component.html',
  styleUrl: './conversations-list-page.component.css',
  standalone:true,
  imports:[CommonModule,RouterLink]
})
export class ConversationsListPageComponent implements OnInit{
  constructor(private conversationService:ConversationService){}
 ngOnInit(): void {
   this.conversationService.conversationsSubject.subscribe(()=>{
          
               this.conversations=this.conversationService.getConversations()
               console.log(this.conversations[0].conversationName)
        })
 }
 conversations:Conversation[]=[]
}
