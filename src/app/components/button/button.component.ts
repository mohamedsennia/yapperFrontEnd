import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
   standalone: true,
  styleUrl: './button.component.css',
  imports:[CommonModule]
})
export class ButtonComponent {
@Input() text!:string
@Input() theme:string="primary"
@Input() icon!:string
}
