import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFolderListComponent } from './job-folder-list.component';

describe('JobFolderListComponent', () => {
  let component: JobFolderListComponent;
  let fixture: ComponentFixture<JobFolderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFolderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
