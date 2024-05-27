import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators';
import { Movie, MovieService } from 'src/app/services/movies/movies.service';
import { MovieResult } from 'src/app/services/models/interfaces'; // Make sure to import the interface MovieResult

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage {
  movieId: string = '';
  public movie: MovieResult | undefined;
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public currentPage = 1;
  public error: string | null = null;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    @Inject(MovieService) private movieService: MovieService // Inject MovieService
  ) {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.loadMovies();
    });
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.isLoading = true;
    this.movieService
      .getMoviesDetails(this.movieId)
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
          this.movie = res;
        },
      });
  }
}
