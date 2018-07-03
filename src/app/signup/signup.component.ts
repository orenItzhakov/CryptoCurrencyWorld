import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignupComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }
  
  onCloseNo(): void {
    this.dialogRef.close();
  }

  onCloseOk() {
    let result = {
      newUser : {
        firstName : this.data.firstName,
        lastName : this.data.lastName,
        email : this.data.email
      },
      details : {
        username : this.data.username,
        password : this.data.password
      }
    }
    this.dialogRef.close(result);
  }
}
