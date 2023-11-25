import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInfoListComponent } from './job-info-list.component';

describe('JobInfoListComponent', () => {
  let component: JobInfoListComponent;
  let fixture: ComponentFixture<JobInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
