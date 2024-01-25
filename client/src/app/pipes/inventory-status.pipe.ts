import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryStatus',
  standalone: true
})
export class InventoryStatusPipe implements PipeTransform {

  transform(num: number): string {
    if(num==0){
        // return `<span class="highlight">Out of Stock</span>`;
        return "Out of Stock";
    }
    else if(num<10){
      return "Only "+ num + " Items Available";
    }
    else{
      return "Available";
    }
  }
}
