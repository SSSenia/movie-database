import { Injectable } from '@angular/core';
import { IMovie, IPage } from '../interfaces/movie';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IAction, IActions } from '../interfaces/account';
import { MoviesService } from './movies.service';

const DEFAULT_ACTION: IActions = {
  last: {
    page: 1,
    movie: 0
  },
  next: {
    page: 1,
    movie: 0
  }
};

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  favoritesSubject: BehaviorSubject<IMovie[]>;
  actionSubject: BehaviorSubject<IActions> = new BehaviorSubject<IActions>(DEFAULT_ACTION);

  constructor(
    private moviesService: MoviesService
  ) {
    const raw = localStorage.getItem('favorites');
    this.favoritesSubject = new BehaviorSubject<IMovie[]>(raw ? JSON.parse(raw) : []);
    this.favoritesSubject.subscribe((array) => {
      localStorage.setItem('favorites', JSON.stringify(array));
    })
  }

  changeAction(action: IAction) {
    if (action.movie >= 19)
      this.actionSubject.next({
        last: action,
        next: {
          page: 1 + action.page,
          movie: 0
        }
      })
    else {

      this.actionSubject.next({
        last: action,
        next: {
          page: action.page,
          movie: 1 + action.movie
        }
      })
    }
  }

  getAction() {
    return this.actionSubject;
  }

  setDefaultAction() {
    this.actionSubject.next(DEFAULT_ACTION);
  }

  getNextMovie() {
    return this.actionSubject.pipe(
      switchMap((action: IActions) => {
        return this.moviesService.getPage(action.next.page)
      }),
      switchMap((page: IPage) => {
        if (page.total_pages == page.page
          && this.actionSubject.getValue().last.movie == page.results.length - 1) {
          this.setDefaultAction();
          return this.moviesService.getPage(1);
        }
        return of(page);
      })
    )
  }

  changeStateMovie(movie: IMovie) {
    if (this.favoritesSubject.getValue().find(x => x.id == movie.id)) {
      this.favoritesSubject.next(this.favoritesSubject.getValue().filter(x => x.id != movie.id));
    }
    else {
      const favorites: IMovie[] = this.favoritesSubject.getValue();
      favorites.unshift(movie);
      this.favoritesSubject.next(favorites);
    }
  }

  getAll(): Observable<IMovie[]> {
    return this.favoritesSubject;
  }

  removeById(id: number) {
    this.favoritesSubject.next(this.favoritesSubject.getValue().filter(x => x.id != id));
  }

}
