import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedService {

  private api_url = 'https://api.flickr.com/services/feeds/photos_public.gne?tagmode=all&jsoncallback=JSONP_CALLBACK&format=json';

  constructor (
    private jsonp: Jsonp
  ) {}

  getTagFeed(tag: string) {
    return this.jsonp
      .get(this.api_url + '&tags=' + tag)
      .map((response) => response.json()).map(val => {
          return val.items;
      });
  }
}
