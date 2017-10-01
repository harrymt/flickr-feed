import { Component } from '@angular/core';
import { FeedService } from './feed.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'flickr-feed',
  template: `
    <div class='flickr-feed'>
      <h2>Flickr Public Feed</h2>
      <input class="search-box" value="harry" type="text" [formControl]="tagSearch">
      <div class='card-list'>
        <div class='card' *ngFor="let item of items | async">
          <div class='card-image'>
            <img src='{{ item.media.m }}'>
          </div>
          <div class='card-text'>
            <div class='row'>
              <h2>{{item.title}}</h2>
            </div>
            <div class='row'>
              <a href='{{ item.author_id }}'>{{ item.author }}</a>
              <span>{{ item.published }}</span>
              <a href='{{ item.link }}'>View on Flickr</a>
            </div>
            <div class='row'>
              {{ item.tags }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./flickr-feed.css']
})

export class FlickrFeedComponent {

  items: Observable<Array<string>>;
  tagSearch = new FormControl();

  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.items = this.tagSearch.valueChanges
       .debounceTime(400)
       .distinctUntilChanged()
       .switchMap(tag => {
           return this.feedService.getTagFeed(tag)
       });
  }
}
