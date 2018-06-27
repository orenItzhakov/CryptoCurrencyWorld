import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoinHistoryDataService {
  data;
  constructor(private http: HttpClient) { }
  
  getHistory(){
    return this.http.get(`https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100`)
  }



}
