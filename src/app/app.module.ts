import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlickrFeedComponent } from './flickr-feed.component';
import { FeedService } from './feed.service';
import { ExtractAuthorPipe } from './extractauthor.pipe';
import { MaxCharsPipe } from './maxchars.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FlickrFeedComponent,
    ExtractAuthorPipe,
    MaxCharsPipe
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
