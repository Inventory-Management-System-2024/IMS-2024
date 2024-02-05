import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateComponent } from './evaluate.component';

describe('EvaluateComponent', () => {
  let component: EvaluateComponent;
  let fixture: ComponentFixture<EvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
