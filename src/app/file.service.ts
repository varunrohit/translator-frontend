import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  configUrl = "assets/config.json"
  dicUrl = "http://127.0.0.1:9000/translator/"


  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<any>(this.configUrl);
  }

  getTranslation(word: string) {
    return this.http.post(this.dicUrl, { "wor" : word })
  }

}
