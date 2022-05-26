import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinManagementComponent } from './pin-management/pin-management.component';

const routes: Routes = [{ path: '', component: PinManagementComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
