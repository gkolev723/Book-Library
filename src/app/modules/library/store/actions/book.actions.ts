import { createAction } from '@ngrx/store';
import { Book } from '../../models/book';

export const loadBook = createAction('[Books Page] Load Book', (payload: string) => ({ payload }));
export const bookLoadedSuccess = createAction('[Books API] Book Loaded Success', (payload: Book) => ({ payload }));
export const bookLoadedError = createAction('[Books API] Book Loaded Error');
