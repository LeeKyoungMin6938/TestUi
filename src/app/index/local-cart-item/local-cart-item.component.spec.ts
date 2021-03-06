import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCartItemComponent } from './local-cart-item.component';

describe('LocalCartItemComponent', () => {
  let component: LocalCartItemComponent;
  let fixture: ComponentFixture<LocalCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
