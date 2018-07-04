import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component'
import { AuthService } from '../auth.service'
import { SignupComponent } from '../signup/signup.component'
import { FormControl } from '@angular/forms';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  position = new FormControl('left');
  show: boolean = false;
  user: User;
  calcCoins: number;
  currentUserID: String;
  access_token: String;
  constructor(private authService: AuthService, private router: Router, private userService: UserService, public coinsService :CoinsService) { }

  ngOnInit() {
    this.currentUserID = JSON.parse(localStorage.getItem('user')).ID.userID;
    this.userService.get(this.currentUserID);
    this.userService.userObservable.subscribe((data) => {
      this.user = data;
      this.calcAllCoins();
    })

  }

  cartShow() {
    this.show = !this.show;
  }

  calcAllCoins() {
    this.calcCoins = 0;
    for (let i = 0; i < this.user.coins.length; i++) {
      if (this.user.coins[i].isActive) this.calcCoins += this.priceNow(this.user.coins[i].name,this.user.coins[i].amount);
    }
  }
  logout() {
    if (JSON.parse(localStorage.getItem('user'))) {
      localStorage.removeItem('user');
      this.user = undefined;
      this.currentUserID = '';
      window.location.href = '/login';
    }
  }

  priceNow(name: string, amount: number) {
    for (let i = 0; i < this.coinsService.coins.length; i++) {
      if (name == this.coinsService.coins[i].name) {
        return amount * this.coinsService.coins[i].price;
      }
    }
  }

  goToProfile() {

    if (JSON.parse(localStorage.getItem('user'))) {
      this.currentUserID = JSON.parse(localStorage.getItem('user')).ID.userID;
      this.router.navigate(['/myPortfolio/', this.currentUserID]);
    }
  }

}
