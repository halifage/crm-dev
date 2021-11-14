import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredSelectComponent } from './filtered-select.component';

describe('VatitFilteredSelectComponent', () => {
  let component: FilteredSelectComponent;
  let fixture: ComponentFixture<FilteredSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
