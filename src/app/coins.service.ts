import { Injectable } from '@angular/core';
import { Coin } from './coin';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class CoinsService {
  public coins: Array<Coin> = new Array<Coin>();
  public coins2: Array<Coin> = [
    {id : 1 , name : "Bitcoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 2 , name : "Ethereum" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 3 , name : "Ripple" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 4 , name : "Bitcoin Cash" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 5 , name : "EOS" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 6 , name : "Litecoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 7 , name : "Stellar" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 8 , name : "Cardano" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 9 , name : "TRON" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 10 , name : "IOTA" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 11 , name : "Bitcoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 12 , name : "Ethereum" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 13 , name : "Ripple" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 14 , name : "Bitcoin Cash" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 15 , name : "EOS" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 16 , name : "Litecoin" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 17 , name : "Stellar" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 18 , name : "Cardano" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 19 , name : "TRON" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4},
    {id : 20 , name : "IOTA" , price: 12 ,market_cap: 21 ,volume : 34 ,change: 35 ,circulating_supply: 4}
  ];
  
  //set Observable & Subject
  public coinsSubject : Subject<Coin[]> = new Subject<Coin[]>();
  public coinsObservable:Observable<Coin[]>;

  // constructor(private http : HttpClient) {
  constructor() {
    this.coinsObservable = this.coinsSubject.asObservable(); // connect the Observable to Subject
  }
  get(): void {
    // this.http.get<Coin[]>("api").subscribe((data)=>{
    //   this.coins = data;
    //   this.coinsSubject.next(this.coins); //update the observable
    // });
    this.coins = this.coins2;
    console.log(this.coins);
    
    this.coinsSubject.next(this.coins); //update the observable
  }

}
