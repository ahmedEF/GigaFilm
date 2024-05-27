import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutPageRoutingModule } from './layout-routing.module';

import { LayoutPage } from './layout.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { NavBarComponent } from 'src/app/_components/nav-bar/nav-bar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ReactiveFormsModule,
    LayoutPageRoutingModule,
  ],
  declarations: [LayoutPage, NavBarComponent],
})
export class LayoutPageModule {}
