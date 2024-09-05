import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/chat/chat.component';
import { authGuard } from './auth-guard.service';

const routes: Routes = [{path:"login",component:LoginComponent},
  {path:"",redirectTo:"conversation/0",pathMatch:"full"},
  {path:"conversation/:id",component:ChatComponent/*,canActivate:[authGuard]*/}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
