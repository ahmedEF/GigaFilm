import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators';
import { MovieResult } from 'src/app/services/models/interfaces'; // Make sure to import the interface MovieResult
import { SeriesService } from 'src/app/services/tv/series.service';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.page.html',
  styleUrls: ['./serie-details.page.scss'],
})
export class SerieDetailsPage {
  serieId: string = '';
  public serie: MovieResult | undefined;
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public currentPage = 1;
  public error: string | null = null;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    @Inject(SeriesService) private serieService: SeriesService // Inject MovieService
  ) {
    this.route.params.subscribe((params) => {
      this.serieId = params['id'];
      this.loadSerie();
    });
  }
  loadSerie(event?: InfiniteScrollCustomEvent) {
    this.isLoading = true;
    this.serieService
      .getTvSerieDetails(this.serieId)
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
          this.serie = res;
        },
      });
  }
  // navigateToSeries(newId: string) {
  //   this.router.navigate(['/app/series/serie-details', newId]);
  // }
}
