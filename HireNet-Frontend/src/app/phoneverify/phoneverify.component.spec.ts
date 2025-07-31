import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneverifyComponent } from './phoneverify.component';

describe('PhoneverifyComponent', () => {
  let component: PhoneverifyComponent;
  let fixture: ComponentFixture<PhoneverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneverifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
