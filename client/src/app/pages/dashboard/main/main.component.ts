import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardsComponent, DatePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  currentDate: Date = new Date();
}
