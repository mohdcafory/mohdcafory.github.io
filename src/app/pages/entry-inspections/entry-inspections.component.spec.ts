import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryInspectionsComponent } from './entry-inspections.component';

describe('EntryInspectionsComponent', () => {
  let component: EntryInspectionsComponent;
  let fixture: ComponentFixture<EntryInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryInspectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
