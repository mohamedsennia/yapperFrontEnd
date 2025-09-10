import { Component, isStandalone } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
standalone:true
})
export class AppComponent {
  title = 'Yapper';

  constructor(){

  }
}
