import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,MatIconModule, FormsModule,MatTableModule, MatButtonModule, MatInputModule, MatFormField, MatInput],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  displayedColumns: string[] = ['id', 'img', 'name', 'ctg', 'desc', 'price', 'stock', 'action'];
  dataSource = [
    { id: 1, img: 'Record 1', name: 'Product1', ctg: 'Category1', desc: 'lorem-ipsum dolor sit', price: '$19.90', stock: '10', action: '1' },
    { id: 2, img: 'Record 2', name: 'Product1', ctg: 'Category1', desc: 'lorem-ipsum dolor sit amet', price: '$19.90', stock: '10', action: '1' },
    { id: 3, img: 'Record 3', name: 'Product1', ctg: 'Category1', desc: 'lorem-ipsum dolor sit amet', price: '$19.90', stock: '10', action: '1' }
  ];

  updateRecord(id: number) {
    console.log("Update record with ID ${id}");
  }

  deleteRecord(id: number) {
    console.log("Delete record with ID ${id}");
  }
}
