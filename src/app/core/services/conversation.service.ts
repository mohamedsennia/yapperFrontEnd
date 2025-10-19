import { Injectable } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { WebSocketService } from "./WebSocket.service";
import { Conversation } from "../../models/Conversation";
import { MessageService } from "./Message.service";
import { Message } from "../../models/Message";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:"root"})
export class ConversationService{
    private _conversationsIndex: Map<number, number>;
    private conversations:Conversation[]
    private conversationsCount:number
    openConversations:Conversation[]
    conversationsSubject:BehaviorSubject<Conversation[]>
  
    constructor(private connectionService:ConnectionService,private webSocketService:WebSocketService,private messageService:MessageService){
        this.conversations=[]
        this._conversationsIndex=new Map<number,number>;
        this.openConversations=[]
        this.conversationsSubject=new BehaviorSubject<Conversation[]>([])
        this.webSocketService.connected.subscribe((param)=>{
            this.connectionService.get<any[]>("conversation").subscribe((conversations)=>{
    
            let index=0
            for(let conversation of conversations){
                let conv=new Conversation(conversation.id,[conversation.lastMessage],conversation.conversationName,false)
                this.conversations.push(conv)
                this._conversationsIndex.set(conversation.id,index)
                index++
              
                this.webSocketService.subscribe(conversation.id)
            }
            this.conversationsSubject.next(this.conversations.slice())
        })
        })
        messageService.messagesSubject.subscribe((message)=>{
            let conversation=this.conversations[this._conversationsIndex.get(message.conversationId)]
            
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
        this.conversationsCount=Math.floor((screen.availWidth-340)/316)
       
    }
 
    openConversation(conversationId:number,messages:Message[]){
        let conversation:Conversation=this.conversations[this._conversationsIndex.get(conversationId)]
        
        if(conversation.isOpen==false){
            let alreadyOpenedCount=this.openConversations.length
            if(alreadyOpenedCount==this.conversationsCount){
                this.openConversations[alreadyOpenedCount-1].isOpen=false
                this.openConversations.pop()
            }
            conversation.messages=messages
        conversation.isOpen=true
        this.openConversations.unshift(conversation)
        }
        return conversation
    }
    addConversation(conversation:Conversation){
        conversation.isOpen=true
        this.conversations.push(conversation)
        this._conversationsIndex.set(conversation.id,this.conversations.length-1)
       let alreadyOpenedCount=this.openConversations.length
            if(alreadyOpenedCount==this.conversationsCount){
                this.openConversations[alreadyOpenedCount-1].isOpen=false
                this.openConversations.pop()
            }
            
        
        this.openConversations.unshift(conversation)
        
    }
    refreshConversations(){
         this.conversationsSubject.next(this.conversations);
    }
    getConversationById(conversationId:number){
        return this.conversations[this._conversationsIndex.get(conversationId)]
    }
    getOpenConversations(){
       
       return this.openConversations
    }
    getConversations(){
        return Array.from(this.conversations.slice())
    }
    closeConversation(index:number){
        this.openConversations[index].isOpen=false
        this.openConversations.splice(index,1)
    }
}