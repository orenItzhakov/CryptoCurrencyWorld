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
  myInterval : any;
  flag :boolean = false ;
  coins: Array<Coin>;
  banMessage : boolean = false;
  constructor(private coinsService: CoinsService, private router : Router) {
    this.coinsService.coinsObservable.subscribe((data) => {
      this.coins = data;
      this.coins.sort(this.compare);
    });
  }

  ngOnInit() {
    this.coinsService.get();
    
    this.myInterval = setInterval(()=>{ 
      this.coinsService.get();
      if(this.flag) clearInterval(this.myInterval);
      console.log("Get coins");
     }, 10000);
  }

  ngOnDestroy(){
    this.flag = true; //stop the Interval
  }

  check(id){
    if(this.coins[id].change == this.coinsService.coinsOld[id].change) return "";
    else if(this.coins[id].change > this.coinsService.coinsOld[id].change) return "green";
    else return "red";
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

  
  compare(a,b) {
    if (a.market_cap < b.market_cap)
      return 1;
    if (a.market_cap > b.market_cap)
      return -1;
    return 0;
  }

  

  
}
