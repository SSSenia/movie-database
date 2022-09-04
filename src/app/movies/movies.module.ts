import { NgModule } from '@angular/core';
import { MoviesListPageComponent } from './movies-list-page/movies-list-page.component';
import { MoviesDetailedPageComponent } from './movies-detailed-page/movies-detailed-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MoviesListPageComponent,
    MoviesDetailedPageComponent
  ],
  exports: [
    MoviesListPageComponent,
    MoviesDetailedPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MoviesListPageComponent },
      { path: ':id', component: MoviesDetailedPageComponent },
    ])
  ],

})
export class MoviesModule { }
