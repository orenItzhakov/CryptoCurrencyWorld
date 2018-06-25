import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
 
const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'myPortfolio', component: MyPortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
