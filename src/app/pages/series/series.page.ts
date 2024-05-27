import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from 'src/app/services/models/interfaces';
import { SeriesService } from 'src/app/services/tv/series.service';
@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage {
  public movieService = inject(SeriesService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public currentPage = 1;
  public series: MovieResult[] = [];
  public error = null;
  public isLoading = false;
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.movieService
      .getTopRatedTvSeries(this.currentPage)
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
