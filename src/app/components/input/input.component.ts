import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuggestionItem } from '../../models/front.models/SuggestionItem';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    standalone: true,
    imports: [NgClass, NgIf,FormsModule,CommonModule,RouterLink]
})
export class InputComponent implements OnInit{

@Input() width!:string
@Input() type!:string
@Input() placeholder!:string
@Input() icon!:string
@Input() size:string
@Output() contentChange:EventEmitter<string>
@Input() content:string
@Input() suggestions:SuggestionItem[]
@Output() enter:EventEmitter<boolean>
constructor(){
    this.contentChange=new EventEmitter<string>
    this.enter=new EventEmitter<boolean>
    this.suggestions=[
        
    ]
    
}
    ngOnInit(): void {
        
    if(this.content==undefined){
        this.content=""
    }
    if(this.size==undefined){
            this.size="normal"
        }


}
keyUp(event:any){
   
    if(event.key=="Enter"){
    
        this.enter.emit(true)
        this.content=""
    }else{
    
        this.change()
    }
    
}
change(){
    
    this.contentChange.emit(this.content)
}
}
