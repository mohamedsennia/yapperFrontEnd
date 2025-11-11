import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConversationService } from '../../core/services/conversation.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConversationsListComponent } from "../../components/conversations-list/conversations-list.component";
import { ConversationComponent } from '../../components/conversation/conversation.component';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/Message.service';


@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.css',
  standalone:true,
  imports: [RouterOutlet, NavbarComponent, ConversationsListComponent,ConversationComponent,CommonModule]
})
export class LoggedComponent implements AfterViewInit{
  width:number
  constructor(private conversationService:ConversationService){
 

  }
  ngAfterViewInit(): void {
    this.width = window.innerWidth;
  }

getOpenConversations(){
 return this.conversationService.getOpenConversations()
}
}
