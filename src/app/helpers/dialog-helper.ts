import { MatDialogConfig } from '@angular/material/dialog';
import { Pin } from '../classes/pin';

export function getDialogConfig(pin: Pin): MatDialogConfig {
  const dialogConfig = getDialogConfigwithoutData();
  dialogConfig.data = pin;
  return dialogConfig;
}

export function getDialogConfigwithoutData(): MatDialogConfig {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '450px';
  dialogConfig.height = '100%';
  dialogConfig.position = {
    top: '0',
    right: '0',
  };

  return dialogConfig;
}
