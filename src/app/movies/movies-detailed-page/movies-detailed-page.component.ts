import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable, of, switchMap } from 'rxjs';
import { IActions } from 'src/app/shared/interfaces/account';
import { IMovie, IPage } from 'src/app/shared/interfaces/movie';
import { AccountsService } from 'src/app/shared/services/account.service';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movies-detailed-page',
  templateUrl: './movies-detailed-page.component.html',
  styleUrls: ['./movies-detailed-page.component.scss']
})
export class MoviesDetailedPageComponent implements OnInit {

  actions$: BehaviorSubject<IActions> = this.accountService.getAction();
  responseNext$!: Observable<IPage>;
  responseMovie$!: Observable<IMovie>;
  errorCatched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    public accountService: AccountsService
  ) { }

  ngOnInit(): void {
    this.responseMovie$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.moviesService.getMovie(params['id'])
      }),
      catchError(() => {
        this.errorCatched = true;
        return EMPTY;
      }));
    this.responseNext$ = this.actions$.pipe(
      switchMap((action: IActions) => {
        return this.moviesService.getPage(action.next.page)
      }),
      switchMap((page: IPage) => {
        if (page.total_pages == page.page
          && this.actions$.getValue().last.movie == page.results.length - 1) {
          this.accountService.changeAction({ page: 1, movie: -1 });
          return this.moviesService.getPage(1);
        }
        return of(page);
      })
    )
  }

  changeStateFavorite(movie: IMovie) {
    this.accountService.changeStateMovie(movie);
  }

  back() {
    this.router.navigate(['/movies'], { queryParams: { page: this.accountService.getAction().getValue().last.page } })
  }

  next(page: IPage) {
    this.router.navigate(['/movies', page.results[this.actions$.getValue().next.movie].id]);
    this.accountService.changeAction(this.actions$.getValue().next);
  }
}