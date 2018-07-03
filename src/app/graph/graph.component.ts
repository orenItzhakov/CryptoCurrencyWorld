import { CoinDetailsComponent } from './../coin-details/coin-details.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js'
import { CoinHistoryDataService } from '../coin-history-data.service';
import { ActivatedRoute } from '@angular/router';
import * as timeConverter from '../../../timeConverter'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  timeArray:any=[];  
  priceArray:any=[];
  results;
  constructor(private coinHistoryDataService: CoinHistoryDataService, public route:ActivatedRoute) { }

  ngOnInit() {
this.route.params.subscribe(params=>{
    
this.coinHistoryDataService.getHistory(params.shortName).subscribe(results=>{this.results=results;

this.results.Data.forEach(element=>this.timeArray.push(timeConverter(element.time)))
this.results.Data.forEach(element=>{this.priceArray.push(element.close)})

let ctx = (<HTMLCanvasElement> document.getElementById("myChart")).getContext('2d')
let myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: this.timeArray,
    datasets: [{
        label: params.shortName,
        data: this.priceArray,
        backgroundColor: ['rgba(255, 255, 255, 0.2)'],
        borderColor: ['#00cf70'],
        borderWidth: 3,
        fill:true,
        lineTension:0,
        pointRadius:0,
        
    }]
},
options:
 {  
     responsive: true,
   
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
});

// {
    
//     scaleShowLabels : false, //remove labels
//     tooltipEvents:[], //remove trigger from tooltips so they will'nt be show
//     pointDot : false, //remove the points markers
//     scaleShowGridLines: true //set to false to remove the grids background
// }


})

}) 




  }

}
