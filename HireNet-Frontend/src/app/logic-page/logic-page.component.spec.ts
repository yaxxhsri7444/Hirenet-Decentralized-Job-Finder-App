import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicPageComponent } from './logic-page.component';

describe('LogicPageComponent', () => {
  let component: LogicPageComponent;
  let fixture: ComponentFixture<LogicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
