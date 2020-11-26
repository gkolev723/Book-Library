import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImgBBUploadService {
  private readonly apiKey: string = 'f68c93c994307ca844450a28a70a356a';

  constructor(private readonly httpClient: HttpClient) {}

  upload(file: File): Observable<string> {
    const formData = new FormData();

    formData.append('image', file);

    return this.httpClient.post('/upload', formData, { params: { key: this.apiKey } }).pipe(map((response) => response['data']['url']));
  }
}
