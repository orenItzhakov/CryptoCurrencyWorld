import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinsService } from '../coins.service';
import { Coin } from '../coin';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  coin : Coin;
  valueUSD : number;
  valueCoin : number = 1;
  myInterval : any;
  flag :boolean ;
  constructor( private route : ActivatedRoute , private coinsService : CoinsService, private userService : UserService,public snackBar: MatSnackBar) {
    this.flag = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.coinsService.coinObservable.subscribe((data)=>{
        this.coin = data;
        this.valueUSD = this.coin.price;
      });

      this.coinsService.coinsObservable.subscribe(()=>{
        if(this.flag) this.coinsService.getCoin(params.shortName);
        this.flag = false;
      });

      this.coinsService.get();
    });
  }
  ngOnDestroy(){
  }

  toCoin(){
    this.valueCoin = this.valueUSD / this.coin.price;
  }
  toUSD(){
    this.valueUSD = this.valueCoin * this.coin.price;
  }

  buyCoin(){
    if(this.userService.user.balance >= this.valueUSD){
      this.userService.addCoin(this.valueCoin ,this.valueUSD, this.coin.name);
      this.snackBar.open("Transaction Done !!", "OK", {
        duration: 2000,
      });
    }
    else{
      this.snackBar.open("You don't have enough money !!", "OK", {
        duration: 2000,
      });
    }
  }
}
