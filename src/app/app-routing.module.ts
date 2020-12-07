import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [
  { path: '', component: UsersTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
