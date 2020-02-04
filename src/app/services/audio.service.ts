import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encodeEchoHidingUrl, encodeLsbUrl, decodeLsbUrl } from './urls';

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
    return this.http.post(encodeLsbUrl(bitIndex, stepByte), formData,
      {
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Accept': 'application/octetstream' },
        responseType: 'blob'
      });
  }

  decodeWithLSB(audioFile: File, bitIndex: number, stepByte: number, textLength: number) {
    const formData = new FormData();
    formData.append('audioFile', audioFile);
    return this.http.post(decodeLsbUrl(bitIndex, stepByte, textLength), formData,
      {
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Accept': '*' },
        responseType: 'text'
      });
  }

  encodeWithEchoHiding(audioFile: File, textFile: File, delay:number) {
    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('textFile', textFile);

    return this.http.post(encodeEchoHidingUrl(delay), formData,
      {
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Accept': '*' },
        responseType: 'blob'
      });
  }
}
