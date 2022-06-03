import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { PinDetailsDialogComponent } from './pin-details-dialog.component';

describe('PinDetailsDialogComponent', () => {
  let component: PinDetailsDialogComponent;
  let fixture: ComponentFixture<PinDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinDetailsDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [
        StoreModule.forRoot(fromRoot.reducers, {
          initialState: fromRoot.getInitialTestingState(),
        }),
      ],
    }).compileComponents();
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
