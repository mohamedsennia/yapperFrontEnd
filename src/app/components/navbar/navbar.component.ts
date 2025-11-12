import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '../../core/services/UserService';
import { InputComponent } from '../input/input.component';
import { CommonModule, NgClass } from '@angular/common';
import { SuggestionItem } from '../../models/front.models/SuggestionItem';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: true,
    imports: [InputComponent, NgClass, RouterLink, CommonModule, RouterLinkActive]
})
export class NavbarComponent implements AfterViewInit{
  menuOppen:boolean
  users:SuggestionItem[]
  search:string=""
  width:number=0
  constructor(private profileService:ProfileService,private userService:UserService){
    this.menuOppen=false
    this.users=[]
  }
  ngAfterViewInit(): void {
    this.width = window.innerWidth;
  }

  getUserName(){
    
    return this.userService.getUserName()
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
  getProfileId(){
   return this.userService.getProfileId()
  }
  logout(){
    this.userService.logOff()
  }
}
