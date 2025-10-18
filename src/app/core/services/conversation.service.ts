import { Injectable } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { WebSocketService } from "./WebSocket.service";
import { Conversation } from "../../models/Conversation";
import { MessageService } from "./Message.service";
import { Message } from "../../models/Message";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:"root"})
export class ConversationService{
    private _conversations: Map<number, Conversation>;
    conversationsSubject:BehaviorSubject<Conversation[]>
  
    constructor(private connectionService:ConnectionService,private webSocketService:WebSocketService,private messageService:MessageService){
        this._conversations=new Map<number,Conversation>;
        this.conversationsSubject=new BehaviorSubject<Conversation[]>([])
        this.webSocketService.connected.subscribe((param)=>{
            this.connectionService.get<any[]>("conversation").subscribe((conversations)=>{
            let convs=[]
            for(let conversation of conversations){
                let conv=new Conversation(conversation.id,[conversation.lastMessage],conversation.conversationName,false)
                this._conversations.set(conversation.id,conv)
                 convs.push(conv)
                this.webSocketService.subscribe(conversation.id)
            }
            this.conversationsSubject.next(convs)
        })
        })
        messageService.messagesSubject.subscribe((message)=>{
            let conversation=this._conversations.get(message.conversationId)
            
            if(!message.isMine){
                if(conversation.isOpen){
                    conversation.messages.unshift(message)
                }else{
                 
                this.messageService.getMessagesByConversationId(message.conversationId).subscribe((messages)=>{
                    this.openConversation(message.conversationId,messages)
                
                })
                }
                
            }
        })
    }
        public get conversations(): Map<number, Conversation> {
        return this._conversations;
    }
    public set conversations(value: Map<number, Conversation>) {
        this._conversations = value;
    } 
    openConversation(conversationId:number,messages:Message[]){
        let conversation:Conversation=this._conversations.get(conversationId)
        conversation.messages=messages
        conversation.isOpen=true
        return conversation
    }
    addConversation(conversation:Conversation){
        this._conversations.set(conversation.id,conversation);
       
        
    }
    refreshConversations(){
         this.conversationsSubject.next(Array.from(this._conversations.values()));
    }
    getConversationById(conversationId:number){
        return this._conversations.get(conversationId)
    }
    getOpenConversations(){

       return Array.from(this._conversations.values()).filter(conv=> conv.isOpen==true)
    }
    getConversations(){
        return Array.from(this._conversations.values())
    }
    closeConversation(id:number){
        this._conversations.get(id).isOpen=false
    }
}