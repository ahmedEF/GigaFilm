import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import { FormatDatePipe } from 'src/app/_pipes/formatDate/formatDate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule,
  ],
  declarations: [MovieDetailsPage, FormatDatePipe],
  exports: [FormatDatePipe],
})
export class MovieDetailsPageModule {}
