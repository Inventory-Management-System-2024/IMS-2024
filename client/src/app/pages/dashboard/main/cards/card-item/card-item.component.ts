import { Component, Input } from '@angular/core';
export interface ProductListing {
  image: string;
  property: string;
  value: number;
}
@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  @Input() carddata!: ProductListing;
  
}
