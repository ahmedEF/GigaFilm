import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'movie-details/:id',
    loadChildren: () =>
      import('../movies/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsPageModule
      ),
  },
  {
    path: 'serie-details/:id',
    loadChildren: () =>
      import('../series/serie-details/serie-details.module').then(
        (m) => m.SerieDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
