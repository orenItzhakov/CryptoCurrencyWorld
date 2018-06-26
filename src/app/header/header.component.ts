import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  show : boolean = false;
  user : User;
  calcCoins : number;
  constructor(private router : Router , private userService : UserService) {
    this.userService.userObservable.subscribe((data)=>{
      this.user = data;
      this.calcAllCoins();
    });
  }

  ngOnInit() {
    this.userService.get();
  }

  cartShow(){
    this.show = !this.show;
  }

  calcAllCoins(){
    this.calcCoins = 0;
    for (let i = 0; i < this.user.coins.length; i++) {
      if(this.user.coins[i].isActive)this.calcCoins+= this.user.coins[i].currentPrice;
    }
  }
}
