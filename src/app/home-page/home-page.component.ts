import { Component, OnInit } from '@angular/core';
import { Coin } from '../coin';
import { CoinsService } from '../coins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', './home-page.component2.scss']
})
export class HomePageComponent implements OnInit {

  coins: Array<Coin>;
  banMessage : boolean = false;
  constructor(private coinsService: CoinsService, private router : Router) {
    this.coinsService.coinsObservable.subscribe((data) => {
      this.coins = data;
    });
  }

  ngOnInit() {
    this.coinsService.get();
    setInterval(() => {
      this.coinsService.get();
      //console.log("Get coins");
    }, 10000);
  }

  check(id) {
    if (this.coins[id].change > 0) return "green";
    else if (this.coins[id].change < 0) return "red";
  }

  turnOff(kind) {
    switch (kind) {
      case 2: this.banMessage = false;
    }
  }

  checkImg(name) {
    if (name) return "sprite-" + name.replace(/\s/g, '').toLowerCase();
  }

  goToCoinScreen(coin : string) {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.router.navigate(['/coin-details/', coin]);
    }
    else {
      this.banMessage = true;
    }
  }

}
