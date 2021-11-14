import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {MatFormFieldAppearance} from "@angular/material/form-field";

@Component({
  selector: 'filtered-select',
  templateUrl: './filtered-select.component.html',
  styleUrls: ['./filtered-select.component.scss']
})
export class FilteredSelectComponent implements OnInit, OnChanges {

  @Input() sourceList: any[] = [];
  @Input() propertyToFilterBy: string = '';
  @Input() propertyToDisplay: string = '';
  @Input() label?: string = '';
  @Input() compareWith?: (o1: any, o2: any) => boolean;
  @Input() appearance?: string;
  @Input() initialValue?: any;

  @Output() onItemSelected = new EventEmitter();

  @ViewChild('selectFilter', {static: false})
  selectSearch!: ElementRef;
  @ViewChild('select', {static: false}) selectElement!: MatSelect;
  filteredList: any[] = [];
  formFieldAppearance: MatFormFieldAppearance = 'outline';

  selectControl = new FormControl();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sourceList) {
      if (changes.sourceList.currentValue) {
        this.filteredList = Object.assign([], changes.sourceList.currentValue);
      }
    }
    if (changes.appearance) {
      if (changes.appearance.currentValue) {
        this.formFieldAppearance = changes.appearance.currentValue
      }
    }

    if (changes.initialValue) {
      if (changes.initialValue.currentValue) {
        this.selectControl.patchValue(changes.initialValue.currentValue)
      } else {
        this.selectControl.reset()
      }
    }

  }

  ngOnInit() {
  }

  filterList(inputElement: EventTarget | null) {
    const filterString = (<HTMLInputElement>inputElement).value.trim();
    if (Object.keys(this.sourceList[0]).includes(this.propertyToFilterBy)) {
      this.filteredList = this.sourceList.filter(item => item[this.propertyToDisplay].toLowerCase().indexOf(filterString.toLowerCase()) >= 0);
      const keyManager = this.selectElement?._keyManager;
      if (keyManager && this.selectElement?.panelOpen) {
        // avoid "expression has been changed" error
        setTimeout(() => {
          keyManager.setFirstItemActive();
        });
      }
    } else {
      console.log('The List Item does not have a property matching the one provided: filtered-select')
    }
  }

  handleSelectedItem(value: any) {
    this.onItemSelected.emit(value)
  }

  handleSelectOptionsOpenedOrClosed(event: boolean) {
    if (event) {
      this.filteredList = Object.assign([], this.sourceList);
      this.selectSearch.nativeElement.value = '';
      this.selectSearch.nativeElement.focus()
    } else {
      this.filteredList = Object.assign([], this.sourceList);
    }
  }

  compareSelectFields(field1: any, field2: any): boolean {
    return field1 === field2
  }


}
