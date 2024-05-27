import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '53cfe52745df9d65608970cb67016058';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2NmZTUyNzQ1ZGY5ZDY1NjA4OTcwY2I2NzAxNjA1OCIsInN1YiI6IjY2NTIxYjVhMTU2NDlkYzBjYjM0OTQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SqKV9hxg978-GY-4JoI3Zfeazf2MwzkIu3H7BTa9P_Y';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private http = inject(HttpClient);

  constructor() {}

  getTvSeries(page = 1): Observable<any> {
    return this.http.get(
      `${BASE_URL}/tv/popular?page=${page}&api_key=${API_KEY}`
    );
  }
  getTopRatedTvSeries(page: number): Observable<any> {
    return this.http.get(
      `${BASE_URL}/tv/top_rated?page=${page}&api_key=${API_KEY}`
    );
  }
  getLatesTvSeries(timeWindow = 'week'): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TOKEN}`);
    return this.http.get(`${BASE_URL}/trending/tv/${timeWindow}`, { headers });
  }
  getTvSerieDetails(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TOKEN}`);
    return this.http.get(`${BASE_URL}/tv/${id}`, { headers });
  }
}
