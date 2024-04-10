import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiURL + '/todos', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // src/app/services/todo.service.ts

  create(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.apiURL + '/todos', todo, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  find(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(this.apiURL + '/todos/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  update(id:number, todo:Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.apiURL + '/todos/' + id, JSON.stringify(todo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  delete(id: number) {
    return this.httpClient.delete<Todo>(this.apiURL + '/todos/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getTodoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(this.apiURL + '/todos/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  search(searchTerm: string): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiURL + '/search?title='+searchTerm, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
