import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Book } from '../../models/book';
import { deleteBook } from '../../store/actions/books.actions';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor(private readonly matDialog: MatDialog, private readonly store: Store<{}>) {}

  ngOnInit(): void {}

  onEditBook(e: Event): void {
    e.stopPropagation();

    this.matDialog.open(EditBookComponent, { data: { book: this.book } });
  }

  onDeleteBook(e: Event): void {
    e.stopPropagation();

    this.store.dispatch(deleteBook(this.book.id));
  }
}
