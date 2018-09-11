import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.url}${path}`, {params, headers: httpOptions.headers});
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.url}${path}`,
      body,
      httpOptions
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.url}${path}`,
      body,
      httpOptions
    );
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.url}${path}`,
      httpOptions
    );
  }
}
