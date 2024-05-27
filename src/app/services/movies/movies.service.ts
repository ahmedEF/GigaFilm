import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResult, MovieResult } from '../models/interfaces';
import { delay } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  rating: number;
  rank: number;
}
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2NmZTUyNzQ1ZGY5ZDY1NjA4OTcwY2I2NzAxNjA1OCIsInN1YiI6IjY2NTIxYjVhMTU2NDlkYzBjYjM0OTQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SqKV9hxg978-GY-4JoI3Zfeazf2MwzkIu3H7BTa9P_Y';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '53cfe52745df9d65608970cb67016058';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  constructor() {}

  getMovies(page = 1): Observable<any> {
    return this.http.get(
      `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
    );
  }
  getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(
      `${BASE_URL}/movie/top_rated?page=${page}&api_key=${API_KEY}`
    );
  }
  getLatesMovies(page = 1): Observable<any> {
    return this.http.get(
      `${BASE_URL}/movie/now_playing?page=${page}&api_key=${API_KEY}`
    );
  }
  getMoviesDetails(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TOKEN}`);
    return this.http.get(`${BASE_URL}/movie/${id}`, { headers });
  }
}
