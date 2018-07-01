import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component'
import { AuthService } from '../auth.service'
import { SignupComponent } from '../signup/signup.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  user: User;
  calcCoins: number = 0;
  currentUserID: String;
  access_token: String;
  constructor(private authService: AuthService, private router: Router, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
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
    if (this.currentUserID) {
      localStorage.removeItem('user');
      this.currentUserID = '';
      alert('See you soon !!');
      this.router.navigate(['']);
    }
  }
  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        console.log('no entry!!')
      }
      else {
        this.authService.login(result.username, result.password);
        this.authService.userUpdate.subscribe(check => {
          if (check) {
            this.currentUserID = JSON.parse(localStorage.getItem('user')).ID.userID;
            this.userService.get(this.currentUserID);
            this.userService.userObservable.subscribe((data) => {
              this.user = data;
              this.calcAllCoins();
            })
          } else {
            alert('User name or password is not correct')
          }
        })
      }
    });

  }

  openSignUpDialog(): void {
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '400px',
      height: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        console.log('no entry!!')
      }
      else {
        this.userService.addUser(result.newUser, result.details);
        this.userService.get(this.currentUserID);
        this.userService.userObservable.subscribe((data) => {
          this.user = data;
          this.calcAllCoins();
        })
      }
    });

  }

  goToProfile() {

    if (JSON.parse(localStorage.getItem('user'))) {
      this.currentUserID = this.authService.current_user;
      this.router.navigate(['/myPortfolio/', this.currentUserID]);
    }
    else {
      alert('Sorry. Log in first !!')
    }
  }

}
