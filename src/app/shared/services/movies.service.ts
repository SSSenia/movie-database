import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IMovie, IPage } from '../interfaces/movie';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  pages: IPage[] = [];
  movies: IMovie[] = [];

  constructor(private http: HttpClient) { }

  getPage(pageId: number): Observable<IPage> {
    let searchPage = this.pages.find(x => x.page == pageId)
    if (searchPage) return of(searchPage)
    return this.http.get<IPage>(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${pageId}`)
      .pipe(
        tap((page: IPage) => {
          this.pages.push(page)
          this.movies = this.movies.concat(page.results)
        })
      )
  }

  getMovie(movieId: number): Observable<IMovie> {
    let searchMovie = this.movies.find(x => x.id == movieId);
    if (searchMovie) return of(searchMovie);
    return this.http.get<IMovie>(`http://api.themoviedb.org/3/movie/${movieId}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`)
  }
}
