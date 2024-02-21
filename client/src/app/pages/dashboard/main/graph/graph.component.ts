import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { SharedDataService } from '../../../../shared/services';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  dataValue:any={
    productCount:0,
    userCount:0,
    orderCount:0
  }
  expenses:any=[];
  totalExpense:any;
  percentages:any;
  constructor(private _sharedData:SharedDataService){
    this._sharedData.getDashBoardData().subscribe(data=>{
      this.dataValue=data;
      this.expenses = [
        { category: 'Products', amount: this.dataValue.productCount, color: 'rgb(0, 0, 255)' },
        { category: 'Orders', amount: this.dataValue.orderCount, color: 'rgb(241, 64, 113 )' },
        { category: 'Users', amount: this.dataValue.userCount, color: 'rgb(255, 195, 0 )' },
    
      ];
      this.totalExpense = this.expenses.reduce((total:any, expense:any) => total + expense.amount, 0);
      this.percentages = this.expenses.map((expense:any) => (
        {
        category: expense.category,
        percentage: (expense.amount / this.totalExpense) * 100,
        color: expense.color
      }));
      this.createPieChart();
    })
  }

 
  createPieChart() {
    if (typeof window !== 'undefined') {
      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

      const myPieChart = new Chart(ctx, {
        type: 'pie',
        
        data: {
          labels: this.percentages.map((expense:any) => expense.category),
          datasets: [{
            label: 'Value',
            data: this.percentages.map((expense:any) => expense.percentage),
            backgroundColor: this.percentages.map((expense:any) => expense.color),
            hoverOffset: 2,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'center',
              labels: {
                padding: 5,
                pointStyle: 'circle',
                textAlign: 'right'
              },
              display: false,
            }
          }
        }
      })
    }
  }
}



