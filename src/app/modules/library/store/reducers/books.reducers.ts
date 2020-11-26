import { createReducer, on } from '@ngrx/store';
import { Book } from '../../models/book';
import { bookCreatedSuccess, bookDeletedSuccess, booksLoadedSuccess, bookUpdatedSuccess } from '../actions/books.actions';

let initialState: Book[] = [];

const _booksReducers = createReducer(
  initialState,
  on(booksLoadedSuccess, (_, { payload }) => payload),
  on(bookCreatedSuccess, (state, { payload }) => [...state, payload]),
  on(bookUpdatedSuccess, (state, { payload }) => {
    state = [...state];

    const index = state.findIndex((book) => book.id === payload.id);

    state[index] = payload;

    return state;
  }),
  on(bookDeletedSuccess, (state, { payload }) => {
    return state.filter((book) => book.id !== payload);
  })
);

export function booksReducers(state, action) {
  return _booksReducers(state, action);
}
