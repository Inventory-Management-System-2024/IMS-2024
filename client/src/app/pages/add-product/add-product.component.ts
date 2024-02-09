import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ProductService,SharedDataService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Cloudinary } from '@cloudinary/url-gen';
import { response } from 'express';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { log } from 'console';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInput,
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  // Recieving data from product-list Component through service
  receivedData: any;
  isUpdateMode:boolean=false;
  isUpdateButton:boolean=false;

  // Accessing the form refrence
  @ViewChild('productForm') form?: NgForm;
  async ngOnInit():  Promise<void> {

    
    if (isPlatformBrowser(this.platformId)) {

    }

    const cld = new Cloudinary({ cloud: { cloudName: 'ddhcbcwjr' } });
    this.sharedDataService.data$.subscribe((data) => {
      this.receivedData = data;
      console.log(
        'this data is recived from product_list when on init',
        this.receivedData
      );
    });
    if (window.location.href.includes('edit')) {
      if (await this.receivedData) {
        // Set isUpdateMode to true if data is received
        this.isUpdateMode = true;
        this.isUpdateButton = true;

        this.flag=true;

        this.form?.setValue({
            productName: await this.receivedData.productName,
            description: await this.receivedData.description,
            price: await this.receivedData.price,
            // category: await this.receivedData.category,
            stock: await this.receivedData.stock,
          });        
      }
      
    } else  //if user want to add_new product
    {
      this.isUpdateMode = false;
      this.isUpdateButton = false;
      

      this.flag=false;
      this.resetForm();
      this.form?.resetForm();
      this.product = {};
    }
  }


  @Output() productSubmitted = new EventEmitter<any>();
  product: any = {};
  selectedFile!: File;
  convertedImage: any;
  flag: boolean = false;
  updatednewData: any;

  constructor(
    private _productService: ProductService,
    private sharedDataService: SharedDataService,
    private route: Router,
    private activated_route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  onSubmit(productForm: NgForm) {
    if (productForm.valid) {
      // console.log(this.receivedData._id);

      if (window.location.href.includes('edit')) {
        console.log('for checking', this.receivedData._id);

        this._productService
          .updateProduct(this.receivedData._id, this.product)
          .subscribe((response) => {
            console.log('Product updated successfully:', response);
            this.resetForm();

            console.log(this.receivedData, this.product);

            this.flag = false;
            this.receivedData = null;
          });
      } else {
        console.log(this.product);
        this._productService.addProduct(this.product).subscribe((response) => {
          console.log('Product added successfully:', response);
          this.resetForm();
          this.product = {};
          this.flag = false;
        });
      }
    }
    this.route.navigate(['/product_list']);
  }

  token = sessionStorage.getItem('token');

  headers = {
    Authorization: `Bearer ${this.token}`,
  };

  resetForm() {
    console.log('inside reset form', this.form);

    {
      this.product = null;
      this.flag = false;
      this.receivedData = null;
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const cloudinaryUploadUrl = 'http://localhost:3000/products/fileupload';
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    return fetch(cloudinaryUploadUrl, {
      method: 'POST',
      body: formData,
      headers: this.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const secureUrl = data.publicurl;
        console.log('Secure URL:', secureUrl);
        this.product.image = [{ url: secureUrl }];
        this.flag = true;
        return secureUrl;
      })
      .catch((error) => {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
      });
  }
}
