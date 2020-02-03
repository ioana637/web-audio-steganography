import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { TabViewModule } from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioService } from './services/audio.service';
import { WindowRef } from './windowref.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxAudioPlayerModule,
    TabViewModule,

  ],
  providers: [WindowRef, AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
