import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';

import { PortfoliosComponent } from './portfolios/portfolios.component';
 
const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'coin-details/:shortName', component: CoinDetailsComponent},
  { path: 'myPortfolio/:ID', component: MyPortfolioComponent},
  { path: 'portfolios', component: PortfoliosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
