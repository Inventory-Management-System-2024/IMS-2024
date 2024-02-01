import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialogComponent } from './update-dialog.component';

describe('UpdateDialogComponent', () => {
  let component: UpdateDialogComponent;
  let fixture: ComponentFixture<UpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
