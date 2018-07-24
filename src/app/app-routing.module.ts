import { EditAuthorComponent } from './edit-author/edit-author.component';
import { AuthGuard } from './auth.guard';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
	{path: 'quotes', component: QuotesComponent},
	{path: 'quotes/create', component: CreateQuoteComponent, canActivate: [AuthGuard]},
	{path: 'quotes/:id/edit', component: EditQuoteComponent, canActivate: [AuthGuard]},
	{path: 'authors', component: AuthorsComponent},
	{path: 'authors/create', component: CreateAuthorComponent, canActivate: [AuthGuard]},
	{path: 'authors/:id/edit', component: EditAuthorComponent, canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: '**', redirectTo: '/quotes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
