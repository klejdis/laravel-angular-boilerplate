import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCreditCard]'
})
export class CreditCardDirective {

  constructor(
    private element: ElementRef,
  ) {
    console.log(this.element)
    console.log('blablbalbla')
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');

    if(trimmed.length > 16){
      trimmed = trimmed.slice(0,16);
    }

    let numbers = [];
    for (let i=0; i<trimmed.length; i+=4){
      numbers.push(trimmed.substr(i,4));
    }

    input.value = numbers.join(' ');
  }
}
