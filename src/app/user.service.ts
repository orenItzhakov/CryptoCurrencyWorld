import { Injectable } from '@angular/core';
import { User } from './user';
import { Subject, Observable } from 'rxjs';
import { BoughtCoin } from './boughtCoin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user : User;
  public users: Array<User> = new Array<User>();

  //set Observable & Subject to coin
  public userSubject : Subject<User> = new Subject<User>();
  public userObservable:Observable<User>;

  //set Observable & Subject to coin
  public usersSubject : Subject<User[]> = new Subject<User[]>();
  public usersObservable:Observable<User[]>;

  constructor(private http : HttpClient) {
    this.userObservable = this.userSubject.asObservable(); // connect the Observable to Subject
    this.usersObservable = this.usersSubject.asObservable(); // connect the Observable to Subject
  }

  get(): void {
    this.http.get<User>('/user/allUsers').subscribe(user => {
      this.user = user[0];
      this.userSubject.next(this.user); //update the observable
    })
  }

  getUsers(): void {
    this.http.get<User[]>('/user/allUsers').subscribe(users => {
      this.users = users;
      this.usersSubject.next(this.users); //update the observable
    })
  }

  addCoin(amount,usd,name){
    this.http.post<User>('/user/buy',{amount:amount ,usd:usd, coin:name,id:this.user._id}).subscribe(user => {
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
