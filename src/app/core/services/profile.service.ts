import { Injectable } from "@angular/core";

import { SuggestionItem } from "../../models/front.models/SuggestionItem";
import { map } from "rxjs";
import { Profile } from "../../models/Profile";
import { UserService } from "./UserService";
import { ConnectionService } from "./connection.service";

@Injectable({providedIn:"root"})
export class ProfileService{
    constructor(private connectionService:ConnectionService,private userService:UserService){

    }
    getProfileLike(keyWord:string){
        return this.connectionService.get<any[]>("profile/search/"+keyWord).pipe(map(profiles=>{
            let suggestedProfiles:SuggestionItem[]=[]
            for(let profile of profiles){
                suggestedProfiles.push(new SuggestionItem(profile.id,profile.profileName,""))
            }
            return suggestedProfiles
        }))
    }


 getProfile(id:number){

  return this.connectionService.get<any>("profile/"+this.userService.getProfileId()+"/"+id).pipe(map(profile=>{
 
    return new Profile(profile.id,profile.profileName,profile.ownerId,profile.subscribers,profile.subscribtions,profile.followed,profile.me,profile.conversationId)
  }))
  
 }
 toggleFollow(id:number){
   return this.connectionService.put("profile/toggleFollow/"+this.userService.getProfileId()+"/"+id,null)
 }


}