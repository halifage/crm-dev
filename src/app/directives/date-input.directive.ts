import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appDateInput]'
})
export class DateInputDirective {

  dateFormatRegex = new RegExp('\\d|\\/|(Tab)|(Alt)|(Backspace)|(Delete)|(Shift)|(Control)|(ArrowLeft)|(ArrowRight)');
  inputField = this.element.nativeElement as HTMLInputElement;
  @Output() dateInputChange = new EventEmitter();
  @Output() dateChangeString = new EventEmitter();

  constructor(private element: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  handleDateInput(event: KeyboardEvent) {
    if (!this.dateFormatRegex.test(event.key)) {
      if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key)) {
        return true
      }
      console.log('invalid key pressed: ', event.key, event);
      event.preventDefault()
    }
    return false
  }

  @HostListener('change')
  buildDateFromString() {
    const inputString = this.inputField.value;
    const dateFromString = moment(inputString, 'DD/MM/YYYY');

    if (dateFromString.isValid()) {
      const newDate = dateFromString.toDate();
      const newDateString = dateFromString.format('DD/MM/YYYY');
      this.inputField.value = newDateString;
      this.dateInputChange.emit(newDate);
      this.dateChangeString.emit(newDateString);
    } else {
      this.dateInputChange.emit('Invalid Date')
    }
  }
}
