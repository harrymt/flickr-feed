import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlickrFeedComponent } from './flickr-feed.component';
import { FeedService } from './feed.service';

@NgModule({
  declarations: [
    AppComponent,
    FlickrFeedComponent
  ],
  imports: [
    JsonpModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
