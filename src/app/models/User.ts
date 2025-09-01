import { Message } from "./Message";

export class User{

    constructor( private  id:number,
     private  firstName:string,
      private lastName:string,
      private email:string,
      private _profileId: number,
      private password?:string,
      private key?:string,
      private _subscribers?: number,
      private _subscribtions?: number,
      
      private _isMe?: boolean,
      private _isFollowed?: boolean
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
  public get subscribtions(): number {
    return this._subscribtions;
  }
  public set subscribtions(value: number) {
    this._subscribtions = value;
  }
  public get subscribers(): number {
    return this._subscribers;
  }
  public set subscribers(value: number) {
    this._subscribers = value;
  }
  public get profileId(): number {
    return this._profileId;
  }
  public set profileId(value: number) {
    this._profileId = value;
  }
    public get isMe(): boolean {
    return this._isMe;
  }
  public set isMe(value: boolean) {
    this._isMe = value;
  }
  public get isFollowed(): boolean {
    return this._isFollowed;
  }
  public set isFollowed(value: boolean) {
    this._isFollowed = value;
  }

   }