import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TViewInfoComponent } from './t-view-info.component';

describe('TViewInfoComponent', () => {
  let component: TViewInfoComponent;
  let fixture: ComponentFixture<TViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TViewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
