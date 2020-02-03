import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {encodeEchoHidingUrl, encodeLsbUrl} from './urls';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  encodeWithLSB(audioFile: File, textFile: File, bitIndex: number, stepByte) {
    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('textFile', textFile);
    // tslint:disable-next-line:max-line-length
    return this.http.post(encodeLsbUrl(bitIndex, stepByte), formData, {headers: {'Access-Control-Allow-Origin' : 'http://localhost:4200'}} );
  }

  encodeWithEchoHiding(audioFile: File, textFile: File) {
    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('textFile', textFile);

    return this.http.post(encodeEchoHidingUrl, formData);
  }
}
