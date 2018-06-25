import { Component, OnInit } from '@angular/core';
import { Coin } from '../coin';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  coins: Array<Coin>;
  constructor(private coinsService : CoinsService) {
    this.coinsService.coinsObservable.subscribe((data)=>{
      this.coins = data;
    });
  }

  ngOnInit() {
    this.coinsService.get();
  }

}
