import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinDetailsDialogComponent } from './pin-details-dialog.component';

describe('PinDetailsDialogComponent', () => {
  let component: PinDetailsDialogComponent;
  let fixture: ComponentFixture<PinDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
