import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/chat/chat.component';
import { HeaderComponent } from './views/header/header.component';
import { FeedComponent } from './views/feed/feed.component';
import { InputComponent } from './components/input/input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { ReplyComponent } from './components/reply/reply.component';
import { ButtonComponent } from './components/button/button.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { ConversationComponent } from './components/conversation/conversation.component';

@NgModule({
    declarations: [

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        LoginComponent,
        ChatComponent,
        HeaderComponent,
        FeedComponent,
        InputComponent,
        NavbarComponent,
        PostComponent,
        ReplyComponent,
        ButtonComponent
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }
