import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from 'src/app/services/models/interfaces';
import { Movie, MovieService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage {
  public movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public currentPage = 1;
  public movies: MovieResult[] = [];
  public error = null;
  public isLoading = false;
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.movieService
      .getTopRatedMovies(this.currentPage)
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
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadMovies(event);
    }, 2000);
  }
}
