import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeCardsComponent } from './employee-time-cards.component';

describe('EmployeeTimeCardsComponent', () => {
  let component: EmployeeTimeCardsComponent;
  let fixture: ComponentFixture<EmployeeTimeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTimeCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
