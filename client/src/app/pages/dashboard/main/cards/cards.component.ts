import { Component } from '@angular/core';
import { CardItemComponent } from './card-item/card-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardItemComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  cardData = [
    { image: 'https://img.icons8.com/?size=80&id=79317&format=png', property: "Total Expenses", value: '$58,420' },
    { image: 'https://img.icons8.com/?size=80&id=wqKbrlpxiZlX&format=png', property: "Gross Profit", value: '$237,813' },
    { image: 'https://img.icons8.com/?size=48&id=VLkxUf20RHGE&format=png', property: "Total Orders", value: '200' },
    { image: 'https://img.icons8.com/?size=80&id=79317&format=png', property: "Total Expenses", value: '$58,420' },
    { image: 'https://img.icons8.com/?size=80&id=wqKbrlpxiZlX&format=png', property: "Gross Profit", value: '$237,813' },
    { image: 'https://img.icons8.com/?size=48&id=VLkxUf20RHGE&format=png', property: "Total Orders", value: '200' }
  ];

}
