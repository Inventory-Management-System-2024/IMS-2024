import { Component } from '@angular/core';
import { CardItemComponent } from './card-item/card-item.component';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../../shared/services';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardItemComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  dataValue:any={
    productCount:0,
    userCount:0,
    orderCount:0
  }
  cardData:any=[]
  constructor(private _shareData:SharedDataService){
    this._shareData.getDashBoardData().subscribe((res)=>{
      
      this.dataValue=res;
      this.cardData = [
        { image: 'https://img.icons8.com/?size=80&id=79317&format=png', property: "Total Products", value: this.dataValue.productCount },
        { image: 'https://img.icons8.com/?size=80&id=wqKbrlpxiZlX&format=png', property: "Total Users", value: this.dataValue.userCount },
        { image: 'https://img.icons8.com/?size=48&id=VLkxUf20RHGE&format=png', property: "Total Orders", value: this.dataValue.orderCount },
    
      ];
    })
  }


}
