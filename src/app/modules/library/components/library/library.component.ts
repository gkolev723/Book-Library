import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../models/book';
import { loadBooks } from '../../store/actions/books.actions';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]> = this.store.select('books');
  searchValue: string = '';
  sortProperty: string = '';
  subscriptions: Subscription[] = [];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<{ books: Book[] }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadBooks());

    this.subscriptions.push(
      this.route.queryParams.pipe(map((params: Params) => params['sortBy'])).subscribe((sortBy) => {
        this.sortProperty = sortBy;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onSort(): void {
    this.router.navigate([], { queryParams: { sortBy: this.sortProperty } });
  }

  onAddBook(): void {
    this.matDialog.open(EditBookComponent);
  }
}
