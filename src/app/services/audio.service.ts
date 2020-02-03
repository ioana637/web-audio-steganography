import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encodeLsbUrl, encodeEchoHidingUrl } from './urls';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  encodeWithLSB(audioFile: File, textFile: File) {
    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('textFile', textFile);

    return this.http.post(encodeLsbUrl, formData);
  }

  encodeWithEchoHiding(audioFile: File, textFile: File) {
    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('textFile', textFile);

    return this.http.post(encodeEchoHidingUrl, formData);
  }
}
