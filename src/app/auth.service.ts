import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from './token';
import { Subject } from 'rxjs/';
import { Observable } from 'rxjs/';
import { User } from './user'

@Injectable()
export class AuthService {

  public current_user: String;
  public userUpdate: Observable<User>;
  public userSubject: Subject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new Subject<User>();
    this.userUpdate = this.userSubject.asObservable();
  }

//   login(usern, pass) {
//     let user = {
//       username: usern,
//       password: pass
//     }
//     this.http.post<any>('/login', user).subscribe((data) => {
//       if (JSON.parse(JSON.stringify(data)).ID.status) {
//         localStorage.setItem('user', JSON.stringify(data));
//         this.current_user = JSON.parse(localStorage.getItem('user')).ID.userID;
//         this.userSubject.next(JSON.parse(localStorage.getItem('user')))
//       }
//       else {
//         alert('User name or password is not correct')
//       }
//       this.router.navigate(['']);
//     });
//   }
}
