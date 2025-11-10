import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/UserService';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    animations: [
        trigger('flipAnimation', [
            state('active', style({
                transform: 'rotateY(180deg)'
            })),
            state('inactive', style({
                transform: 'rotateY(0)'
            })),
            transition('active => inactive', animate('600ms ease-out')),
            transition('inactive => active', animate('600ms ease-in'))
        ])
    ],
    standalone: true,
    imports: [NgClass, ReactiveFormsModule, NgIf]
})
export class LoginComponent implements OnInit{
  flip: string
  loginForm:FormGroup;
  signUpForm:FormGroup;
  badCred:boolean=false;
  err:boolean=false
constructor( private userService:UserService,private router:Router){
 this.flip='inactive';
 this.loginForm=new FormGroup({});
 this.signUpForm=new FormGroup({});
}
 ngOnInit(): void {
  this.loginForm=new FormGroup({
   email:new FormControl(null,[Validators.email,Validators.required]),
   password:new FormControl(null,[Validators.required])
 })
 this.signUpForm=new FormGroup({
   firstName:new FormControl(null,[Validators.required]),
   lastName:new FormControl(null,[Validators.required]),
   email:new FormControl(null,[Validators.email,Validators.required]),
   password:new FormControl(null,[Validators.required])
 })
 }
toggleFlip(side:string){
  this.err=false
  this.badCred=false
 this.flip =side;
}
signUp(){
 if(this.signUpForm.valid){
 this.userService.signUp(new User(null,this.signUpForm.value["firstName"].toLowerCase(),this.signUpForm.value["lastName"].toLowerCase(),this.signUpForm.value['email'].toLowerCase(),this.signUpForm.value['password'],"")).subscribe((param)=>{
   this.router.navigate(['/'])

 },err=>{
   this.userService.logOff()
   console.log(err+"hhhhhhhhhh")
   window.alert('Please check your signUp info1')
 })
}else{
 window.alert('Please check your login info')
}
}
login(){

 if(this.loginForm.valid){
   
   this.userService.loggIn(new User(null,"","",this.loginForm.value['email'].toLowerCase(),this.loginForm.value['password'],"")).subscribe((param)=>{

     this.router.navigate(['/'])

   },err=>{
     this.userService.logOff()
      console.log(err)
     window.alert('Please check your login info')
   })
 }else{
   window.alert('Please check your login info')
 }
}
}
