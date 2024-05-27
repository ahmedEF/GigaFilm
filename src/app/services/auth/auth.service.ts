import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://194.163.138.25:5001/api/v1';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/signin`;
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      map((response) => {
        if (response?.access_token) {
          localStorage.setItem('_authToken', response.access_token);
          localStorage.setItem('_refreshToken', response.refresh_token);
          localStorage.setItem('userEmail', response.user.email);
          localStorage.setItem('username', response.user.username);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('_authToken')}`,
    });

    return this.http
      .post(url, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('_authToken');
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    const body = { username, email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(body);
    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.error}`;
    } else {
      // Server-side error
      errorMessage = `${error.error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
