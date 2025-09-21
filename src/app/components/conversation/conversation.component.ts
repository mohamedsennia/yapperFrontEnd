import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Conversation } from '../../models/Conversation';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/Message';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
  standalone:true,
  imports: [CommonModule,FormsModule]
})
export class ConversationComponent {
  @Input() conversation:Conversation
  messageContent:string
  @ViewChild("conversationEnd") conversationEnd!:ElementRef
  sendMessage(){
    if(this.messageContent!=""){
    this.conversation.messages.push(new Message(0,this.messageContent,new Date(),true))
    let c=this.messageContent
    this.scroll()
    setTimeout(() => {
      this.conversation.messages.push(new Message(0,"nta "+c,new Date(),false))
      this.scroll()
    }, 1500);
    this.messageContent=""
    
    }
  }
  scroll(){
    this.conversationEnd.nativeElement.scrollIntoView({block:"end"})
  }
}
