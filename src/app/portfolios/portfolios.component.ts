import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {
  public users: Array<User> = new Array<User>();
  public usersProfit : object;
  public checkProfitFlag : boolean = false;
  constructor(private userService : UserService,private coinsService : CoinsService) {
    this.coinsService.get();
    this.userService.usersObservable.subscribe((data)=>{
      this.users = data;
      this.checkProfit();
    });
  }

  ngOnInit() {
    this.userService.getUsers();
  }

  checkProfit(){
    this.usersProfit = {};
    for (let i = 0; i < this.users.length; i++) {
      let id = this.users[i]._id;
      let profit:any = 0;
      let coins={};
      for (let j = 0; j < this.users[i].coins.length; j++) {
        if(this.users[i].coins[j].isActive){
          let name = this.users[i].coins[j].name;
          let amount = this.users[i].coins[j].amount;
          let priceNow;
          for (let q = 0; q < this.coinsService.coins.length; q++) {
            if(name==this.coinsService.coins[q].name){
              priceNow = amount*this.coinsService.coins[q].price;
            }
          }
          profit+= priceNow - this.users[i].coins[j].currentPrice;
          coins[name]=1;
        }
      }
      profit = parseFloat(profit.toFixed(2));
      if (profit>=0) profit = "$" + profit;
      else if (profit<0) profit = "-$" + Math.abs(profit);
      this.usersProfit[id]={
        coins:coins ,
        profit:profit ,
        coinsNames: function() {
          let names="";
          if (Object.keys(this.coins).length === 0 ) return "No coins";
          for (var key in this.coins){
            names+= key + ", ";
          }
          return names;
        }
      };
    }
    this.checkProfitFlag = true;
  }

}
