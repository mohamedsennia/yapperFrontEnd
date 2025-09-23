import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Conversation } from '../../models/Conversation';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/Message';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../core/services/Message.service';



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
  constructor(private messageService:MessageService){}
  sendMessage(){
    if(this.messageContent!=""){
    let message=new Message(0,this.messageContent,new Date(),true,this.conversation.id)
    this.conversation.messages.unshift(message)
    this.messageService.sendMessage(message,this.target).subscribe(()=>{
this.messageContent=""
    })
    
    
    }
  }

}
