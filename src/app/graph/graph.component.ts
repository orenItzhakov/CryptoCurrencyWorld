import { CoinDetailsComponent } from './../coin-details/coin-details.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js'
import { CoinHistoryDataService } from '../coin-history-data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  timeArray:any=[];  
  priceArray:any=[];
  results;
  constructor(private coinHistoryDataService: CoinHistoryDataService) { }

  ngOnInit() {

this.coinHistoryDataService.getHistory().subscribe(results=>{this.results=results; 
// console.log(this.results.Data)
this.results.Data.forEach(element=>this.timeArray.push(element.time))
this.results.Data.forEach(element=>{this.priceArray.push(element.close)})

let ctx = (<HTMLCanvasElement> document.getElementById("myChart")).getContext('2d')
let myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: this.timeArray,
    datasets: [{
        label: 'BTC',
        data: this.priceArray,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
    }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:false
            }
        }]
    }
}
});
})






  }

}
