import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../../core/services/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from '../../../models/Conversation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../core/services/Message.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrl: './conversation-page.component.css',
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class ConversationPageComponent implements OnInit{
  conversation:Conversation
  messageContent:string
  constructor(private conversationService:ConversationService,private activatedRoute:ActivatedRoute,private messageService:MessageService){
    
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

  }

}
