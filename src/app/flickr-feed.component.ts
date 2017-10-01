import { Component } from '@angular/core';
import { FeedService } from './feed.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'flickr-feed',
  template: `
    <div>
      <h2>Flickr Feed</h2>
      <input type="text" [formControl]="tagSearch">
      <ul>
        <li *ngFor="let item of items | async">{{item.title}}</li>
      </ul>
    </div>
  `
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
