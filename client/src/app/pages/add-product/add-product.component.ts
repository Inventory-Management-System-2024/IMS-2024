import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent, FooterComponent, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatInput,],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() productSubmitted = new EventEmitter<any>();
  product: any = {}
  selectedFile: File | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

    }
  }
  onSubmit() {
    console.log('Form submitted:', this.product);
    this.productSubmitted.emit(this.product);
  }
}
