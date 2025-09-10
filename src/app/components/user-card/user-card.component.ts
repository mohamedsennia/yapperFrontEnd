import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ButtonComponent } from "../button/button.component";
import { UserService } from '../../services/UserService';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/Profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit{
 @Input() profile!:Profile
 isSet:boolean=false
 constructor(private profileService:ProfileService){
  
 }
  ngOnInit(): void {
    this.isSet=true
    console.log(this.profile)
   
   
  }
 
 toggleFollow(){
  this.profileService.toggleFollow(this.profile.id).subscribe(()=>{
    this.profile.isFollowed=!this.profile.isFollowed
  })
 }
}
