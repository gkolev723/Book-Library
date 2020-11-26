import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BookEffects {
  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Books Page] Load Book'),
      mergeMap(({ payload }) =>
        this.booksService.getBook(payload).pipe(
          map((book) => ({ type: '[Books API] Book Loaded Success', payload: book })),
          catchError(() => of({ type: '[Books API] Book Loaded Error' }))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly booksService: BooksService) {}
}
