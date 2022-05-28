import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PinManagementComponent } from './pin-management/pin-management.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PinEffects } from '@store/effects/pin.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PinDetailsDialogComponent } from './pin-management/pin-details-dialog/pin-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    PinManagementComponent,
    PinDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({}), // configuration for redux sanitization
    EffectsModule.forRoot([PinEffects]),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
