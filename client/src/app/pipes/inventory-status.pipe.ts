import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'inventoryStatus',
  standalone: true
})
export class InventoryStatusPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(num: number): SafeHtml {
    if (num === 0) {
      return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: red">Out of stock</span>`);
    } else if (num < 10) {
      return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: #FF7F50">Only ${num} Items left</span>`);
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(`<span style="color: #006400">${num} Items Available</span>`);
    }
  }
}
