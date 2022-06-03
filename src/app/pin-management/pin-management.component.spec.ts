import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { PinManagementComponent } from './pin-management.component';

describe('PinManagementComponent', () => {
  let component: PinManagementComponent;
  let fixture: ComponentFixture<PinManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinManagementComponent],
      providers: [{ provide: MatDialog, useValue: {} }],
      imports: [
        StoreModule.forRoot(fromRoot.reducers, {
          initialState: fromRoot.getInitialTestingState(),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
