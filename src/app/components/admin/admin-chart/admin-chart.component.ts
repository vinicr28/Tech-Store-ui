import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.css']
})
export class AdminChartComponent implements OnInit{

  ordersPerDay: number[] = [0,0,0,0,0,0,0]

  constructor(private service: OrderService){ }

  ngOnInit(): void {
    this.service.reportOrderWeek().subscribe((response: any) => {
      response.forEach(element => {
        this.ordersPerDay.splice(element.dayOfWeek, 1, element.orderQuantity)
      });
      console.log(this.ordersPerDay)
      
      this.lineChart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Orders'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        },
        series: [
          {
            name: 'Orders per day',
            data: this.ordersPerDay
          } as any
        ]
      })
      
    })
  }

  lineChart = new Chart();
  

  


}
