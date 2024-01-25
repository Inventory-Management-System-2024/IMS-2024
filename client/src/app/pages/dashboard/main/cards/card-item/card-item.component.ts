import { Component, Input } from '@angular/core';
export interface PropertyListing {
  image: string;
  property: string;
  value: string;
}
@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  @Input() carddata!: PropertyListing;

}
