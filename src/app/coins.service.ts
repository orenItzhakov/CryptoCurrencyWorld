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
  public coinsOld: Array<Coin> = new Array<Coin>();
  public firstCopy = true;
  //set Observable & Subject to coins
  public coinsSubject : Subject<Coin[]> = new Subject<Coin[]>();
  public coinsObservable:Observable<Coin[]>;

  // constructor(private http : HttpClient) {
  constructor(private http : HttpClient) {
    this.coinsObservable = this.coinsSubject.asObservable(); // connect the Observable to Subject
    this.coinObservable = this.coinSubject.asObservable(); // connect the Observable to Subject
  }
  get(): void {
    if(!this.firstCopy) this.coinsOld = this.coins.slice();
    this.http.get<Coin[]>('/coins').subscribe((data)=>{
      this.coins = data;
      this.coinsSubject.next(this.coins); //update the observable

      if(this.firstCopy) this.coinsOld = this.coins.slice();
      this.firstCopy = false;
    });
  }

  getCoin(shortName : string){
    this.coin = this.findCoin(shortName);
    this.coinSubject.next(this.coin); //update the observable
  }

  findCoin(shortName : string): Coin {
    for (let i = 0; i < this.coins.length; i++) {
      if(this.coins[i].shortName == shortName) return this.coins[i];
    }
  }

}
