import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/movie';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAction, IActions } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  favoritesSubject: BehaviorSubject<IMovie[]> = new BehaviorSubject<IMovie[]>([]);
  actionSubject: BehaviorSubject<IActions> = new BehaviorSubject<IActions>({
    last: {
      page: 1,
      movie: 0
    },
    next: {
      page: 1,
      movie: 0
    }
  });

  constructor() { }

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

  isHaveMovieById(id: number): boolean {
    return !!this.favoritesSubject.getValue().find(x => x.id == id);
  }

  getAll(): Observable<IMovie[]> {
    return this.favoritesSubject;
  }

  removeById(id: number) {
    this.favoritesSubject.next(this.favoritesSubject.getValue().filter(x => x.id != id));
  }

}
