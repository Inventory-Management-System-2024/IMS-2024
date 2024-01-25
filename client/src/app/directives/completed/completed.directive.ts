import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCompleted]',
  standalone: true
})
export class CompletedDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "green";
    el.nativeElement.style.color = "white";
    el.nativeElement.style.padding = "2px 10px 6px 10px";
    el.nativeElement.style.fontSize = "14px";
    el.nativeElement.style.borderRadius = "10px";
    el.nativeElement.style.margin = "2px";
  }

}
