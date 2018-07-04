import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component'
import { AuthService } from '../auth.service'
import { SignupComponent } from '../signup/signup.component'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  position = new FormControl('left');
  show: boolean = false;
  user: User;
  calcCoins: number = 0;
  currentUserID: String;
  access_token: String;
  constructor(private authService: AuthService, private router: Router, private userService: UserService, public dialog: MatDialog) { }

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
    for (let i = 0; i < this.user.coins.length; i++) {
      if (this.user.coins[i].isActive) this.calcCoins += this.user.coins[i].currentPrice;
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
  // openLoginDialog(): void {
  //   let dialogRef = this.dialog.open(LoginComponent, {
  //     width: '400px',
  //     height: '600px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == undefined) {
  //       console.log('no entry!!')
  //     }
  //     else {
  //       this.authService.login(result.username, result.password);
  //       this.authService.userUpdate.subscribe(check => {
  //         if (check) {
  //           this.currentUserID = JSON.parse(localStorage.getItem('user')).ID.userID;
  //           this.userService.get(this.currentUserID);
  //           this.userService.userObservable.subscribe((data) => {
  //             this.banMessage = false;
  //             this.loginMessage = true;
  //             this.user = data;
  //             this.calcAllCoins();
  //           })
  //         } else {

  //         }
  //       })
  //     }
  //   });

  // }

  // openSignUpDialog(): void {
  //   let dialogRef = this.dialog.open(SignupComponent, {
  //     width: '400px',
  //     height: '500px',
  //     data: {}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == undefined) {
  //       console.log('no entry!!')
  //     }
  //     else {
  //       this.userService.addUser(result.newUser, result.details);
  //       if (this.currentUserID) {
  //         this.currentUserID = this.userService.user._id;
  //         this.userService.get(this.currentUserID);
  //         this.userService.userObservable.subscribe((data) => {
  //           this.welcomeMessage = true;
  //           this.user = data;
  //           this.calcAllCoins();
  //         })
  //       }
  //     }
  //   });

  // }

  goToProfile() {

    if (JSON.parse(localStorage.getItem('user'))) {
      this.currentUserID = JSON.parse(localStorage.getItem('user')).ID.userID;
      this.router.navigate(['/myPortfolio/', this.currentUserID]);
    }
  }

}
