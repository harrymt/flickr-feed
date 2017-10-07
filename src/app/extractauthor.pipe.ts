import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractauthor'
})

/**
 * Converts email@example.com ("Authors Name") to
 * Authors Name
 */
export class ExtractAuthorPipe implements PipeTransform {
  transform(val: string): string {
    var arr = val.split(" ");
    arr.shift(); // Take off first element
    var result = arr.join(" ");
    result = result.substring(2, result.length -2);
    return result;
  }
}
