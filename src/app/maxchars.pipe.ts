import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxchars'
})

/**
 * Truncates characters to max chars and appends ...
 */
export class MaxCharsPipe implements PipeTransform {
  transform(val: string, maxchars): string {
    if(val.length < maxchars) {
      return val;
    }
    return val.substring(0, maxchars) + "...";
  }
}
