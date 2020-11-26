import { createReducer, on } from '@ngrx/store';
import { Book } from '../../models/book';
import { bookLoadedSuccess } from '../actions/book.actions';

let initialState: Book;

const _bookReducers = createReducer(
  initialState,
  on(bookLoadedSuccess, (_, { payload }) => payload)
);

export function bookReducers(state, action) {
  return _bookReducers(state, action);
}
