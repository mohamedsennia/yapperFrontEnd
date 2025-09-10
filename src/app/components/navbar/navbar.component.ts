import { Component } from '@angular/core';
import { UserService } from '../../services/UserService';
import { InputComponent } from '../input/input.component';
import { NgClass } from '@angular/common';
import { SuggestionItem } from '../../models/front.models/SuggestionItem';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: true,
    imports: [InputComponent, NgClass, RouterLink]
})
export class NavbarComponent {
  menuOppen:boolean
  users:SuggestionItem[]
  search:string=""
  constructor(private profileService:ProfileService){
    this.menuOppen=false
    this.users=[]
  }
  getUserName(){
    return localStorage.getItem("userName")
  }
  oppenMenu(){
    this.menuOppen=true
  }
  closeMenu(){
    this.menuOppen=false
  }
  toggleMenu(){
    this.menuOppen=!this.menuOppen
  }
  typing(value:string){
      this.search=value
    if(this.search==""){
      this.users=[]
    }else{
       this.users=[]

      this.profileService.getProfileLike(this.search).subscribe((users)=>{
        this.users=users
      })
    }
  }
}
