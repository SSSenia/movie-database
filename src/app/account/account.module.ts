import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFavoriteListPageComponent } from './my-favorite-list-page/my-favorite-list-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyFavoriteListPageComponent
  ],
  exports: [
    MyFavoriteListPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MyFavoriteListPageComponent}
    ])
  ]
})
export class AccountModule { }
