import { Injectable } from "@angular/core";

import { map, Observable, Subject } from "rxjs";
import { Message } from "../../models/Message"
import { UserService } from "./UserService";
import { ConnectionService } from "./connection.service";
import { Profile } from "../../models/Profile";

@Injectable({"providedIn":"root"})
export class MessageService{
     messagesSubject:Subject<Message[]>
     messageNotification:Subject<boolean>
    private messages:Message[]
    private user2Id:number;

constructor(private userService:UserService,private connectionService:ConnectionService){
    this.messagesSubject=new Subject<Message[]>()
    this.messageNotification=new Subject<boolean>()
    this.messages=[]

}
sendMessage(message:Message, targetId:number){
if(message.conversationId==-1){
    return    this.connectionService.post("messsages/newConversation/"+targetId,{
        "profileId":this.userService.getProfileId(),
        "content":message.content,
        "conversationId":message.conversationId
    })
}else{
    return this.connectionService.post("messsages",{
        "profileId":this.userService.getProfileId(),
        "content":message.content,
        "conversationId":message.conversationId
    })
}
}
getMessagesByConversationId(id:number){
    return this.connectionService.get<any[]>("messsages/byConversationId/"+id).pipe(map(data=>{
        let messages=[]

        for(let d of data){
             
            let p=new Profile(d.sender.id,d.sender.profileName,d.sender.ownerId,d.sender.subscribers,d.sender.subscribtions,d.sender.followed,d.sender.me,d.sender.conversationId)
            messages.unshift(new Message(d.id,d.content,d.time,d.mine,id,p))
           
        }
        return messages
    }))
}
}