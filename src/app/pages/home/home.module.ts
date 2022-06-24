import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WriterComponent } from 'src/app/components/writer/writer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TweetListComponent } from 'src/app/components/tweet-list/tweet-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    WriterComponent,
    TweetListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule


  ],
  exports: [HomeComponent]
})
export class HomeModule { }
