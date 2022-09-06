import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IMovie } from '../interfaces/movie';
import { AccountsService } from '../services/account.service';

@Pipe({
  name: 'isHasMovie'
})
export class IsHasMoviePipe implements PipeTransform {

  constructor(
    private accountService: AccountsService
  ){

  }
  transform(id: number): Observable<boolean>{
    return this.accountService.getAll().pipe(
      map((array)=>{
        return !!array.find(x => x.id == id);
      })
    );
  }

}
