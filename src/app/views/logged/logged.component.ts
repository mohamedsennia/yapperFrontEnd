import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConversationService } from '../../core/services/conversation.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.css',
  standalone:true,
  imports:[RouterOutlet]
})
export class LoggedComponent {
  constructor(private conversationService:ConversationService){
 

  }
}
