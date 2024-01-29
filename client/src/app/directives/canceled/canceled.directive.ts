import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCanceled]',
  standalone: true
})
export class CanceledDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "red";
    el.nativeElement.style.color = "white";
    el.nativeElement.style.padding = "2px 10px 6px 10px";
    el.nativeElement.style.fontSize = "14px";
    el.nativeElement.style.borderRadius = "10px";
    el.nativeElement.style.margin = "2px";
  }

}
