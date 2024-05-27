import { Component, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from 'src/app/services/models/interfaces';
import { Movie, MovieService } from 'src/app/services/movies/movies.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { SeriesService } from 'src/app/services/tv/series.service';
register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public movieService = inject(MovieService);
  public tvService = inject(SeriesService);

  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public currentPage = 1;
  public movies: MovieResult[] = [];
  public series: MovieResult[] = [];
  public error = null;
  public isLoading = false;
  constructor() {
    this.loadMovies();
    this.loadSeries();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.movieService
      .getLatesMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.movies.push(...res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }
  loadSeries(event?: InfiniteScrollCustomEvent) {
    this.tvService
      .getLatesTvSeries()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.series.push(...res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }
}
