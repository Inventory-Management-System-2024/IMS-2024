import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(el: ElementRef) { 
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
