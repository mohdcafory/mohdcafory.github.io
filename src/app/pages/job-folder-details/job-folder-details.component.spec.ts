import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFolderDetailsComponent } from './job-folder-details.component';

describe('JobFolderDetailsComponent', () => {
  let component: JobFolderDetailsComponent;
  let fixture: ComponentFixture<JobFolderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFolderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
