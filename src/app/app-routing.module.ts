import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/logged/chat/chat.component';
import { authGuard } from './core/guards/auth-guard.service';
import { FeedComponent } from './views/logged/feed/feed.component';
import { UserProfileComponent } from './views/logged/user-profile/user-profile.component';
import { LoggedComponent } from './views/logged/logged.component';
import { ConversationPageComponent } from './views/phone/conversation-page/conversation-page.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
 
  {
    path: "",
    component: LoggedComponent,
    children: [
      { path: "feed", component: FeedComponent },
     
      { path: "yapper/:id", component: UserProfileComponent },
       {path:"conversation/:id",component:ConversationPageComponent},
       {path:"conversation",component:ConversationPageComponent},
      { path: "", redirectTo: "feed", pathMatch: "full" }, // default route
    ],
    canActivate:[authGuard]
  },
  
  { path: "**", redirectTo: "feed" }, // wildcard fallback
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
