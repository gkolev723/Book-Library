import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ImgBBUploadService } from '../../../shared/services/imgbbUpload';
import { Book } from '../../models/book';
import { bookCreatedError, bookCreatedSuccess, bookUpdatedError, bookUpdatedSuccess, createBook, updateBook } from '../../store/actions/books.actions';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBookComponent implements OnInit, OnDestroy {
  editBookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.pattern(/\d+/)]),
    genre: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    price: new FormControl('', [Validators.required, Validators.pattern(/\d+/)]),
  });
  imageUploading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly matDialog: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private readonly imgBBUploadService: ImgBBUploadService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<{}>,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.populateForm(this.data.book);
    }

    this.subscriptions.push(
      this.actions$.pipe(ofType(bookCreatedSuccess, bookCreatedError, bookUpdatedSuccess, bookUpdatedError)).subscribe(() => {
        this.matDialog.close();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onUploadImageClick(input: HTMLInputElement): void {
    const event: Event = document.createEvent('MouseEvents');

    event.initEvent('click', true, false);

    input.dispatchEvent(event);
  }

  uploadImage(input: HTMLInputElement): void {
    this.imageUploading = true;
    this.changeDetectorRef.markForCheck();

    this.imgBBUploadService.upload(input.files[0]).subscribe((image) => {
      this.editBookForm.controls['image'].setValue(image);
      this.imageUploading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  onUpdateBook(): void {
    const title: string = this.editBookForm.controls['title'].value;
    const year: number = +this.editBookForm.controls['year'].value;
    const genre: string = this.editBookForm.controls['genre'].value;
    const image: string = this.editBookForm.controls['image'].value;
    const price: number = +this.editBookForm.controls['price'].value;

    const book: Book = {
      title,
      year,
      genre,
      image,
      price,
    };

    if (this.data) {
      this.store.dispatch(updateBook({ id: this.data.book.id, book }));
    } else {
      this.store.dispatch(createBook(book));
    }
  }

  populateForm(book: Book): void {
    const { title, year, genre, image, price } = book;

    this.editBookForm.controls['title'].setValue(title);
    this.editBookForm.controls['year'].setValue(year);
    this.editBookForm.controls['genre'].setValue(genre);
    this.editBookForm.controls['image'].setValue(image);
    this.editBookForm.controls['price'].setValue(price);
  }
}
