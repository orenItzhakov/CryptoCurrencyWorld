import { Injectable } from '@angular/core';
import { User } from './user';
import { Subject, Observable } from 'rxjs';
import { BoughtCoin } from './boughtCoin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  demo_user : User = {
    id :1,
    firstName : "Oren",
    lastName : "Itzhakov" ,
    email: "oren3274@gmail.com",
    balance: 11000, 
    coins : [
      {id : 1,amount: 3, currentPrice: 3000,date : new Date(),isActive : true ,name :"Bitcoin" },
      {id : 2,amount: 1, currentPrice: 100,date : new Date(),isActive : true,name :"Ethereum"},
      {id : 3,amount: 2, currentPrice: 3000,date : new Date(),isActive : true,name :"Ripple"},
      {id : 4,amount: 5, currentPrice: 600,date : new Date(),isActive : true,name :"Ripple"},
    ]
  };
  user : User;

  //set Observable & Subject to coin
  public userSubject : Subject<User> = new Subject<User>();
  public userObservable:Observable<User>;

  constructor() {
    this.userObservable = this.userSubject.asObservable(); // connect the Observable to Subject
  }

  get(): void {
    this.user = this.demo_user;
    this.userSubject.next(this.user); //update the observable
  }

  addCoin(newCoin : BoughtCoin , price){
    this.user.coins.push(newCoin);
    this.user.balance -= price;
    this.userSubject.next(this.user); //update the observable
  }

  sellCoin(id:number , coin : BoughtCoin) {
    this.user.balance += coin.currentPrice;
    this.user.coins[id].isActive = false;
    this.userSubject.next(this.user); //update the observable
  }

}
