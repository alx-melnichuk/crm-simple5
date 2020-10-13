import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CViewTaskListComponent } from './c-view-task-list.component';

describe('CViewTaskListComponent', () => {
  let component: CViewTaskListComponent;
  let fixture: ComponentFixture<CViewTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CViewTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CViewTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
