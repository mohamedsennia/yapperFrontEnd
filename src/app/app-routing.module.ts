import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/chat/chat.component';
import { authGuard } from './auth-guard.service';
import { FeedComponent } from './views/feed/feed.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

const routes: Routes = [{path:"login",component:LoginComponent},
  {path:"",component:FeedComponent,pathMatch:"full"},
  {path:"conversation/:id",component:ChatComponent,canActivate:[authGuard]},
  {path:"yapper/:id",component:UserProfileComponent},
  {path:"**",redirectTo:""},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
