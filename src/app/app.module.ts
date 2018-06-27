import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { CoinsService } from './coins.service';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule,MatSnackBarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphComponent } from './graph/graph.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    MyPortfolioComponent,
    CoinDetailsComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [CoinsService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
