import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPhoneInputMask]'
})
export class PhoneInputMaskDirective {

  regex = new RegExp('[0-9]');
  field = this.element.nativeElement as HTMLInputElement;

  constructor(private element: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const charValue = event.key;
    if (this.regex.test(charValue)) {
      return true
    } else {
      if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z', 'y'].includes(charValue)) {
        return true
      }
      event.preventDefault()
      return false
    }
  }
  //
  // @HostListener('change')
  // processInput() {
  //   if(this.field.value) {
  //     this.formatToPhone(this.field.value)
  //   }
  // }

  // private formatToPhone(value: string) {
  //   for (let i = 0; i < value.length; i++) {
  //     if (i > 0 && i % 2 === 0) {
  //
  //     }
  //   }
  // }
}
