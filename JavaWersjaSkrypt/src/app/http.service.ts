import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostData } from "./PostData";
import { ResponseData } from './ResponseData';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = "http://localhost:8080/test";

  constructor(private http: HttpClient) { }

  calculate(postData: PostData): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.url, postData);
  }
}
