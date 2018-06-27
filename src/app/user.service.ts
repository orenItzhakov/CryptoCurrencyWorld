import { Injectable } from '@angular/core';
import { User } from './user';
import { Subject, Observable } from 'rxjs';
import { BoughtCoin } from './boughtCoin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : User;

  //set Observable & Subject to coin
  public userSubject : Subject<User> = new Subject<User>();
  public userObservable:Observable<User>;

  constructor(private http : HttpClient) {
    this.userObservable = this.userSubject.asObservable(); // connect the Observable to Subject
  }

  get(): void {
    this.http.get<User>('/user/myPortfolio').subscribe(user => {
      this.user = user[0];
      this.userSubject.next(this.user); //update the observable
    })
  }

  addCoin(amount,name){
    this.http.post<User>('/user/buy',{amount:amount , coin:name,id:this.user._id}).subscribe(user => {
      this.user = user[0];
      this.userSubject.next(this.user); //update the observable
    });
  }

  sellCoin(id:string) {
    this.http.post<User>('/user/sell',{user:this.user._id , coin:id }).subscribe(user => {
      this.user = user[0];
      this.userSubject.next(this.user); //update the observable
    });
  }

}
