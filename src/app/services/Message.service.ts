import { Injectable } from "@angular/core";
import { ApiService } from "./Api.serivce";
import { map, Observable, Subject } from "rxjs";
import { Message } from "../models/message"
import { UserService } from "./UserService";

@Injectable({"providedIn":"root"})
export class MessageService{
     messagesSubject:Subject<Message[]>
     messageNotification:Subject<boolean>
    private messages:Message[]
    private user2Id:number;

constructor(private apiService:ApiService,private userService:UserService){
    this.messagesSubject=new Subject<Message[]>()
    this.messageNotification=new Subject<boolean>()
    this.messages=[]

}
getConversation(user2:number){
    this.user2Id=user2;
    return this.apiService.getConversation(user2).pipe(map(messages=>{
        let conversation:Message[]=[]
        for(let message of messages){
            conversation.push(new Message(message['id'],message['content'],new Date(message['time']),message['senderId'],message['recipientId']))
        }
        this.messages=conversation.slice()
        this.messagesSubject.next(this.messages)
        return conversation.slice()
    }));
}
addMessage(message:Message){

    if((message.getSenderId()==this.userService.getCurrentId()&&message.getRecipientId()==this.user2Id)||(message.getSenderId()==this.user2Id&&message.getRecipientId()==this.userService.getCurrentId())){
        this.messages.push(message)
        this.messagesSubject.next(this.messages)
    }
    this.messageNotification.next(true)
}
}