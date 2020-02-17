import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Notes} from './notes';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/notes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpResult: Observable<Notes[]>;
  res: Notes[] = [];
  result: Notes[] = [];

  constructor(private http: HttpClient) {
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(apiUrl)
      .pipe(
        tap(note => console.log('getNotes=', note)),
        catchError(this.handleError('getNotes', []))
      );
  }

  getNote(id: number): Observable<Notes> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Notes>(url).pipe(
      tap(_ => console.log(`fetched note id=${id}`)),
      catchError(this.handleError<Notes>(`getNote id=${id}`))
    );
  }

  addNote(note: Notes): Observable<Notes> {
    return this.http.post<Notes>(apiUrl, note, httpOptions).pipe(
      tap((prod: Notes) => console.log(`added note w/ id=${note.id}`)),
      catchError(this.handleError<Notes>('addNote'))
    );
  }

  updateNote(id: any, note: Notes): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, note, httpOptions).pipe(
      tap(_ => console.log(`updated note id=${id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }

  deleteNote(id: any): Observable<Notes> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Notes>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted note id=${id}`)),
      catchError(this.handleError<Notes>('deleteNote'))
    );
  }
}

