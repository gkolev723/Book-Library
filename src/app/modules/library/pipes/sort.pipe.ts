import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'sortBooks',
})
export class SortBooksPipe implements PipeTransform {
  transform(books: Book[], sortProperty: string): Book[] {
    switch (sortProperty) {
      case 'title':
        return [...books].sort((a, b) => a.title.localeCompare(b.title));
      case 'genre':
        return [...books].sort((a, b) => a.genre.localeCompare(b.genre));
      case 'year':
        return [...books].sort((a, b) => a.year - b.year);
      default:
        return books;
    }
  }
}
