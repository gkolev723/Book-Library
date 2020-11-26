import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookComponent } from './components/book/book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { LibraryComponent } from './components/library/library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SearchBooksPipe } from './pipes/search.pipe';
import { SortBooksPipe } from './pipes/sort.pipe';
import { BooksService } from './services/books.service';
import { BookEffects } from './store/effects/book.effects';
import { BooksEffects } from './store/effects/books.effects';
import { bookReducers } from './store/reducers/book.reducers';
import { booksReducers } from './store/reducers/books.reducers';

@NgModule({
  declarations: [LibraryComponent, BookComponent, EditBookComponent, BookDetailsComponent, SearchBooksPipe, SortBooksPipe],
  providers: [BooksService],
  imports: [
    SharedModule,
    LibraryRoutingModule,
    StoreModule.forFeature('book', bookReducers),
    StoreModule.forFeature('books', booksReducers),
    EffectsModule.forFeature([BookEffects]),
    EffectsModule.forFeature([BooksEffects]),
  ],
})
export class LibraryModule {}
