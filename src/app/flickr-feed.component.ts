import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FeedService } from './feed.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ExtractAuthorPipe } from './extractauthor.pipe';
import { MaxCharsPipe } from './maxchars.pipe';


@Component({
  selector: 'app-flickr-feed',
  template: `
    <div class='flickr-feed'>
      <h2>Flickr Public Feed</h2>
      <input id="search-box" class="search-box" value="harry" type="text" [formControl]="tagSearch">
      <button class="btn btn-primary" md-button (click)="clicked($event)">Search</button>
      <ul class='card-list list-unstyled'>
        <li class='media flickr-card' *ngFor="let item of items | async">
          <pre style="display: none;">{{ item | json }}</pre>
          <div class="img-wrapper">
            <img class='d-flex mr-3' src='{{ item.media.m }}'>
          </div>
          <div class='card-text media-body'>
            <div class='row'>
              <h5 class='mt-0 mb-1'>{{item.title | maxchars:75}}</h5>
            </div>
            <div class='row'>
              <a class='col' href='{{ item.author_id }}'>{{ item.author | extractauthor }}</a>
              <span class='col'>{{ item.published | date:'medium' }}</span>
              <a class='col' href='{{ item.link }}'>View on Flickr</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./flickr-feed.css']
})

export class FlickrFeedComponent implements OnInit {

  items: Observable<Array<string>>;
  tagSearch = new FormControl();

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.items = this.tagSearch.valueChanges
       .debounceTime(400)
       .distinctUntilChanged()
       .switchMap(tag => {
          return this.feedService.getTagFeed(tag);
       });

    // Search default tag
    this.tagSearch.setValue('harry');
    this.items = this.feedService.getTagFeed('harry');
  }

  clicked(event) {
    event.preventDefault(); // Don't submit a form

    // Search for the tag
    this.items = this.feedService.getTagFeed(this.tagSearch.value);
  }
}
