import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { IPage } from 'src/app/shared/interfaces/movie';
import { AccountsService } from 'src/app/shared/services/account.service';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.scss']
})
export class MoviesListPageComponent implements OnInit {

  currentPage: number = 1;
  response$!: Observable<IPage>
  pages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private accountService: AccountsService
  ) { }

  ngOnInit(): void {
    this.response$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        if (!+params['page']) {
          this.router.navigate(['movies'], { queryParams: { page: 1 } })
          return EMPTY;
        }
        this.currentPage = +params['page']
        return this.moviesService.getPage(this.currentPage)
          .pipe(
            tap((list) => {
              this.pages = [];
              for (let i = this.currentPage - 3; i <= +this.currentPage + 3; i++)
                if (i > 0 && i <= list.total_pages) this.pages.push(i)
            })
          );
      })
    )
  }

  action(movie: number) {
    this.accountService.changeAction({
      page: this.currentPage,
      movie: movie
    })
  }

}
