import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsHasMoviePipe } from './pipes/is-has-movie.pipe';

@NgModule({
  declarations: [
    IsHasMoviePipe
  ],
  exports: [
    CommonModule,
    IsHasMoviePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
