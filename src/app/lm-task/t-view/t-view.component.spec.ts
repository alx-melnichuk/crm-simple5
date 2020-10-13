import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TViewComponent } from './t-view.component';

describe('TViewComponent', () => {
  let component: TViewComponent;
  let fixture: ComponentFixture<TViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
