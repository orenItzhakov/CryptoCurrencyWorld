import { Injectable } from '@angular/core';
import { Coin } from './coin';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class CoinsService {
  public coin: Coin;
  //set Observable & Subject to coin
  public coinSubject : Subject<Coin> = new Subject<Coin>();
  public coinObservable:Observable<Coin>;

  public coins: Array<Coin> = new Array<Coin>();
  public coins2: Array<Coin> = [
    {id : 1 , name : "Bitcoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : "BTC"},
    {id : 2 , name : "Ethereum" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : "ETH"},
    {id : 3 , name : "Ripple" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : "RIP"},
    {id : 4 , name : "Bitcoin Cash" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : "BIC"},
    {id : 5 , name : "EOS" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : "EOS"},
    {id : 6 , name : "Litecoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 7 , name : "Stellar" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 8 , name : "Cardano" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 9 , name : "TRON" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 10 , name : "IOTA" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 11 , name : "Bitcoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 12 , name : "Ethereum" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 13 , name : "Ripple" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 14 , name : "Bitcoin Cash" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 15 , name : "EOS" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 16 , name : "Litecoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 17 , name : "Stellar" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 18 , name : "Cardano" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 19 , name : "TRON" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
    {id : 20 , name : "IOTA" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4 ,shortName : ""},
  ];
  
  //set Observable & Subject to coins
  public coinsSubject : Subject<Coin[]> = new Subject<Coin[]>();
  public coinsObservable:Observable<Coin[]>;

  // constructor(private http : HttpClient) {
  constructor() {
    this.coinsObservable = this.coinsSubject.asObservable(); // connect the Observable to Subject
    this.coinObservable = this.coinSubject.asObservable(); // connect the Observable to Subject
  }
  get(): void {
    // this.http.get<Coin[]>("api").subscribe((data)=>{
    //   this.coins = data;
    //   this.coinsSubject.next(this.coins); //update the observable
    // });
    this.coins = this.coins2;
    this.coinsSubject.next(this.coins); //update the observable
  }

  getCoin(id : number){
    this.coin = this.coins2[id];
    this.coinSubject.next(this.coin); //update the observable
  }

}
