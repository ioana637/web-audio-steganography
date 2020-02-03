import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }
}
