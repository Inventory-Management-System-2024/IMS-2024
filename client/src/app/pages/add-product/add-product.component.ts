import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { MatTextareaAutosize } from '@angular/material/textarea';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
// import { CdkTextareaAutosize } from '@angular/cdk/text-field';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatInput,],
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
