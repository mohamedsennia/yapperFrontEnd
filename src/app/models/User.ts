import { Message } from "./message";

export class User{
    constructor( private  id:number,
     private  firstName:string,
      private lastName:string,
      private email:string,
      private password:string,
      private key:string,
    private message:Message
    ){}
   
      getId(){
       return this.id;
      }
      getFirstName(){
       return this.firstName
      }
      getLastName(){
       return this.lastName
      }
      getEmail(){
       return this.email
      }
      getPassword(){
       return this.password
      }
      getKey(){
       return this.key
      }
      setId(id:number){
       this.id=id
      }
      setFirstName(firstName:string){
       this.firstName=firstName
      }
      setLastName(lastName:string){
       this.lastName=lastName
      }
      setEmail(email:string){
       this.email=email
      }
      setPassword(password:string){
       this.password=password
      }
      setKey(key:string){
       this.key=key
      }
      getMessage(){
        return this.message
      }
      setMessage(message:Message){
        this.message=message
      }
   }