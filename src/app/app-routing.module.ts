import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/logged/chat/chat.component';
import { authGuard } from './core/guards/auth-guard.service';
import { FeedComponent } from './views/logged/feed/feed.component';
import { UserProfileComponent } from './views/logged/user-profile/user-profile.component';
import { LoggedComponent } from './views/logged/logged.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: LoggedComponent,
    children: [
      { path: "feed", component: FeedComponent },
      { path: "conversation/:id", component: ChatComponent, canActivate: [authGuard] },
      { path: "yapper/:id", component: UserProfileComponent },
      { path: "", redirectTo: "feed", pathMatch: "full" }, // default route
    ],
  },
  { path: "**", redirectTo: "feed" }, // wildcard fallback
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
