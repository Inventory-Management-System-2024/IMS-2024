import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() productSubmitted = new EventEmitter<any>();
  product:any={}
  selectedFile: File | null = null;

  onSubmit() {
    console.log('Form submitted:', this.product);
    this.productSubmitted.emit(this.product);
  }
}
