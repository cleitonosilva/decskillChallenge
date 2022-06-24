import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],

})
export class AppModule { }
