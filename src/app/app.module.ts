import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DxButtonModule,
  DxGalleryModule,
  DxSelectBoxModule,
  DxSliderModule,
  DxTabPanelModule,
  DxTabsModule,
  DxVectorMapModule,
} from 'devextreme-angular';
import { LoadingService } from './services/loading';
import { HttpClientModule } from '@angular/common/http';
import { HelloComponent } from './hello/hello.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [AppComponent, HelloComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxVectorMapModule,
    DxSelectBoxModule,
    DxSliderModule,
    DxTabPanelModule,
    DxTabsModule,
    DxGalleryModule,
    HttpClientModule,
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
