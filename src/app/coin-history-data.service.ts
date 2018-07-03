import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoinHistoryDataService {
  data;
  constructor(private http: HttpClient) { }
  
  getHistory(shortName){
    return this.http.get(`/coinHistory/${shortName}`)
  }



}
