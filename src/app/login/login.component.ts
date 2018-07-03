import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username : string = "";
  private password : string = ""; 

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onCloseNo(): void {
    this.dialogRef.close();
  }

  onCloseOk() {
    let data = {
      username : this.username,
      password : this.password
    }
    this.dialogRef.close(data);
  }

}
