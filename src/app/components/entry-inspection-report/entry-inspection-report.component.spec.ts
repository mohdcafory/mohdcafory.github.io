import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryInspectionReportComponent } from './entry-inspection-report.component';

describe('EntryInspectionReportComponent', () => {
  let component: EntryInspectionReportComponent;
  let fixture: ComponentFixture<EntryInspectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryInspectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryInspectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
