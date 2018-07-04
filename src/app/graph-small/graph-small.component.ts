import { CoinHistoryDataService } from './../coin-history-data.service';
import { Component, OnInit, Input } from '@angular/core';
import * as timeConverter from '../../../timeConverter';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-graph-small',
  templateUrl: './graph-small.component.html',
  styleUrls: ['./graph-small.component.scss']
})
export class GraphSmallComponent implements OnInit {
@Input() shortName;
timeArray:any=[];
priceArray:any=[];
results:any;
results7day:any;
  constructor(private coinHistoryDataService: CoinHistoryDataService) { }

  ngOnInit() {
    this.coinHistoryDataService.getHistory(this.shortName).subscribe(results=>{this.results=results;
        // console.log(this.results[0].coinHistoryData)
    
    this.results7day = this.results[0].coinHistoryData.filter((element, index)=>index%7===0)
      
    this.results7day.forEach(element=>this.timeArray.push(timeConverter(element.date))) 
    // console.log(this.timeArray)

      this.results7day.forEach(element=>{this.priceArray.push(element.price)})
      let ctx = (<HTMLCanvasElement> document.getElementById(this.shortName)).getContext('2d')
      Chart.defaults.scale.gridLines.display = false;
    
      let myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.timeArray,
          datasets: [{
              label: '',
              data: this.priceArray,
              // backgroundColor: ['rgba(255, 255, 255, 0.2)'],
              borderColor: ['#00cf70'],
              borderWidth: 1,
              fill:false,
              lineTension:0,
              pointRadius:0,
              
          }]
      },
      options:
       { animation:{
           duration:0,
       },
           responsive: true,
         
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
              display:false},{ticks: {
                beginAtZero:true
            }}],
              xAxes:[{display:false}]
              
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
  }

}
