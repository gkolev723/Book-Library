import { createAction } from '@ngrx/store';
import { Book } from '../../models/book';

export const loadBooks = createAction('[Books Page] Load Books');
export const booksLoadedSuccess = createAction('[Books API] Books Loaded Success', (payload: Book[]) => ({ payload }));
export const booksLoadedError = createAction('[Books API] Books Loaded Error');

export const createBook = createAction('[Books Page] Create Book', (payload: Book) => ({ payload }));
export const bookCreatedSuccess = createAction('[Books API] Book Created Success', (payload: Book) => ({ payload }));
export const bookCreatedError = createAction('[Books API] Book Created Error');

export const updateBook = createAction('[Books Page] Update Book', (payload: { id: string; book: Book }) => ({ payload }));
export const bookUpdatedSuccess = createAction('[Books API] Book Updated Success', (payload: Book) => ({ payload }));
export const bookUpdatedError = createAction('[Books API] Book Updated Error');

export const deleteBook = createAction('[Books Page] Delete Book', (payload: string) => ({ payload }));
export const bookDeletedSuccess = createAction('[Books API] Book Deleted Success', (payload: string) => ({ payload }));
export const bookDeletedError = createAction('[Books API] Book Deleted Error');
