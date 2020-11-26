import { Component } from '@angular/core';
import { ImgBBUploadService } from './modules/shared/services/imgbbUpload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'book-library';

  constructor(private readonly imgBBUploadService: ImgBBUploadService) {}

  onInput(e: Event) {
    const input: HTMLInputElement = e.target as HTMLInputElement;

    this.imgBBUploadService.upload(input.files[0]).subscribe((url) => console.log(url));
  }
}
