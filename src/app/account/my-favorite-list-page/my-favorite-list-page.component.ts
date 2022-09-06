import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces/movie';
import { AccountsService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-my-favorite-list-page',
  templateUrl: './my-favorite-list-page.component.html',
  styleUrls: ['./my-favorite-list-page.component.scss']
})
export class MyFavoriteListPageComponent implements OnInit {

  response$!: Observable<IMovie[]>

  constructor(
    private accountService: AccountsService
  ) { }

  ngOnInit(): void {
    this.response$ = this.accountService.getAll();
    this.accountService.setDefaultAction();
  }

  unfavorite(id: number) {
    this.accountService.removeById(id);
  }

}
