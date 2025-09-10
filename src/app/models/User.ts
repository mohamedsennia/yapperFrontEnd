import { Message } from "./Message";

export class User{
  public get profileId(): number {
    return this._profileId;
  }
  public set profileId(value: number) {
    this._profileId = value;
  }

    constructor( private  id:number,
     private  firstName:string,
      private lastName:string,
      private email:string,
      private _profileId: number,
      private password?:string,
      private key?:string
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
      



   }