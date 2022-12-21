import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByProductComponentComponent } from './by-product-component.component';

describe('ByProductComponentComponent', () => {
  let component: ByProductComponentComponent;
  let fixture: ComponentFixture<ByProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByProductComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
