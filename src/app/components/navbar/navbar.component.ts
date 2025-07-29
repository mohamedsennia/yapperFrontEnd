import { Component } from '@angular/core';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOppen:boolean
  constructor(private userService:UserService){
    this.menuOppen=false
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
}
