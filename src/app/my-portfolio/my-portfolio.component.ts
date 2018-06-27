import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { BoughtCoin } from '../boughtCoin';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss']
})
export class MyPortfolioComponent implements OnInit {
  user:User;
  constructor(private userService : UserService) {
    
  }

  ngOnInit() {
    this.userService.userObservable.subscribe((data)=>{
      this.user = data;
    });
    this.userService.get();
  }

  checkTable(){
    for (let i = 0; i < this.user.coins.length; i++) {
      if(this.user.coins[i].isActive) return false;
    }
    return true;
  }

  checkTable2(){
    for (let i = 0; i < this.user.coins.length; i++) {
      if(!this.user.coins[i].isActive) return false;
    }
    return true;
  }

  sell(id:string){
    this.userService.sellCoin(id);
  }

}
