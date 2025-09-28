import { Injectable } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { WebSocketService } from "./WebSocket.service";

@Injectable({providedIn:"root"})
export class ConversationService{
    constructor(private connectionService:ConnectionService,private webSocketService:WebSocketService){
        this.webSocketService.connected.subscribe((param)=>{
            this.connectionService.get<any[]>("conversation").subscribe((conversations)=>{
            for(let conversation of conversations){
                this.webSocketService.subscribe(conversation.id)
            }
        })
        })
    }
    g
}