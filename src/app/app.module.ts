import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxButtonModule, DxVectorMapModule } from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DxButtonModule, DxVectorMapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
