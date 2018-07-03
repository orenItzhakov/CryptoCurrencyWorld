import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnInit() {
    if (!(JSON.parse(localStorage.getItem('user')))) {
      window.location.href = '/login';
    }
  }
}
