import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Books Page] Load Books'),
      mergeMap(() =>
        this.booksService.getBooks().pipe(
          map((books) => ({ type: '[Books API] Books Loaded Success', payload: books })),
          catchError(() => of({ type: '[Books API] Books Loaded Error' }))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Books Page] Create Book'),
      mergeMap(({ payload }) =>
        this.booksService.createBook(payload).pipe(
          map((book) => ({ type: '[Books API] Book Created Success', payload: book })),
          catchError(() => of({ type: '[Books API] Book Created Error' }))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Books Page] Update Book'),
      mergeMap(({ payload }) =>
        this.booksService.updateBook(payload['id'], payload['book']).pipe(
          map((book) => ({ type: '[Books API] Book Updated Success', payload: book })),
          catchError(() => of({ type: '[Books API] Book Updated Error' }))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Books Page] Delete Book'),
      mergeMap(({ payload }) =>
        this.booksService.deleteBook(payload).pipe(
          map(() => ({ type: '[Books API] Book Deleted Success', payload })),
          catchError(() => of({ type: '[Books API] Book Deleted Error' }))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly booksService: BooksService) {}
}
