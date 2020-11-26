import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { uniqueId } from '../../shared/utilities/uuid';
import { books } from '../database/books';
import { Book } from '../models/book';

@Injectable()
export class BooksService {
  books: Book[] = books;

  createBook(book: Book): Observable<Book> {
    const created = { ...book, id: uniqueId() } as Book;

    this.books = [...this.books];
    this.books.push(created);

    return of(created);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    const updated = { ...book, id } as Book;

    const index: number = this.books.findIndex((b) => b.id === id);

    this.books = [...this.books];
    this.books[index] = updated;

    return of(updated);
  }

  deleteBook(id: string): Observable<string> {
    this.books = this.books.filter((b) => b.id !== id);

    return of(id);
  }

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: string): Observable<Book> {
    const book: Book = this.books.find((book) => book.id === id);

    return of(book);
  }
}
