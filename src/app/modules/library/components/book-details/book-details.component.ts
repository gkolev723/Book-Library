import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../models/book';
import { loadBook } from '../../store/actions/book.actions';
import { bookDeletedSuccess, bookUpdatedSuccess, deleteBook } from '../../store/actions/books.actions';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book$: Observable<Book> = this.store.select('book');
  subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<{ book: Book }>,
    private readonly matDialog: MatDialog,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.pipe(map((params: Params) => params['id'])).subscribe((id) => {
        this.store.dispatch(loadBook(id));
      })
    );

    this.subscriptions.push(
      this.actions$.pipe(ofType(bookDeletedSuccess)).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
    );

    this.subscriptions.push(
      this.actions$.pipe(ofType(bookUpdatedSuccess)).subscribe(() => {
        this.store.dispatch(loadBook(this.route.snapshot.params['id']));
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onEditBook(book: Book): void {
    this.matDialog.open(EditBookComponent, { data: { book } });
  }

  onDeleteBook(book: Book): void {
    this.store.dispatch(deleteBook(book.id));
  }
}
