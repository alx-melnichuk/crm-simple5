import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CViewInfoComponent } from './c-view-info.component';

describe('CViewInfoComponent', () => {
  let component: CViewInfoComponent;
  let fixture: ComponentFixture<CViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CViewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
