import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoinHistoryDataService {
  data;
  constructor(private http: HttpClient) { }
  
  getHistory(shortName){
    return this.http.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${shortName}&tsym=USD&limit=400`)
  }



}
