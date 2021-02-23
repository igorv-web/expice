import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladsComponent } from './salads.component';

describe('SaladsComponent', () => {
  let component: SaladsComponent;
  let fixture: ComponentFixture<SaladsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaladsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
