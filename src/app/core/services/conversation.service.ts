import { Injectable } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { WebSocketService } from "./WebSocket.service";
import { Conversation } from "../../models/Conversation";
import { MessageService } from "./Message.service";
import { Message } from "../../models/Message";

@Injectable({providedIn:"root"})
export class ConversationService{
    private _conversations: Map<number, Conversation>;

  
    constructor(private connectionService:ConnectionService,private webSocketService:WebSocketService,private messageService:MessageService){
        this._conversations=new Map<number,Conversation>;
        this.webSocketService.connected.subscribe((param)=>{
            this.connectionService.get<any[]>("conversation").subscribe((conversations)=>{
            for(let conversation of conversations){
                this._conversations.set(conversation.id,
                    new Conversation(conversation.id,[conversation.lastMessage],"",false)
                )
                this.webSocketService.subscribe(conversation.id)
            }
        })
        })
        messageService.messagesSubject.subscribe((message)=>{
            let conversation=this._conversations.get(message.conversationId)
            
            if(!message.isMine){
                if(conversation.isOpen){
conversation.messages.unshift(message)
                }else{
                    console.log("wait")
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
    getConversationById(conversationId:number){
        return this._conversations.get(conversationId)
    }
    getOpenConversations(){

       return Array.from(this._conversations.values()).filter(conv=> conv.isOpen==true)
    }
    
}