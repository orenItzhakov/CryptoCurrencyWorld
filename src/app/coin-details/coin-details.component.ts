import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinsService } from '../coins.service';
import { Coin } from '../coin';
import { UserService } from '../user.service';
import { BoughtCoin } from '../boughtCoin';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  coin : Coin;
  valueUSD : number;
  valueCoin : number = 1;
  constructor( private route : ActivatedRoute , private coinsService : CoinsService, private userService : UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.coinsService.coinObservable.subscribe((data)=>{
        this.coin = data;
        if( !this.valueUSD ) this.valueUSD = this.coin.price;
      });
      this.coinsService.getCoin(params.shortName);
    });
  }

  toCoin(){
    this.valueCoin = this.valueUSD / this.coin.price;
  }
  toUSD(){
    this.valueUSD = this.valueCoin * this.coin.price;
  }

  buyCoin(){
    if(this.userService.user.balance >= this.valueUSD){
      var newBougthCoin = {id : 9 ,amount: this.valueCoin, currentPrice: this.valueUSD,date : new Date(),isActive : true,name : this.coin.name};
      this.userService.addCoin(newBougthCoin , this.valueUSD);
    }
  }
}
