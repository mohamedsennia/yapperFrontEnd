import { Component, Input } from '@angular/core';
import { User } from '../../models/User';
import { ButtonComponent } from "../button/button.component";
import { UserService } from '../../services/UserService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
 @Input() user!:User
 constructor(private userService:UserService){
  
 }
 toggleFollow(){
  this.userService.toggleFollow(this.user.getId()).subscribe(()=>{
    this.user.isFollowed=!this.user.isFollowed
  })
 }
}
