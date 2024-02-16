import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {

  expenses = [
    { category: 'Purchase', amount: 50000, color: 'rgb(0, 0, 255)' },
    { category: 'Sales', amount: 100000, color: 'rgb(241, 64, 113 )' },
    { category: 'Expense', amount: 20000, color: 'rgb(255, 195, 0 )' },
    { category: 'Gross Profit', amount: 60000, color: 'rgb(42, 146, 7 )' },

  ];

  totalExpense = this.expenses.reduce((total, expense) => total + expense.amount, 0);
  percentages = this.expenses.map(expense => ({
    category: expense.category,
    percentage: (expense.amount / this.totalExpense) * 100,
    color: expense.color
  }));
  ngOnInit() {
    this.createPieChart();
  }
  createPieChart() {
    if (typeof window !== 'undefined') {
      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.percentages.map(expense => expense.category),
          datasets: [{
            label: 'Value',
            data: this.percentages.map(expense => expense.percentage),
            backgroundColor: this.percentages.map(expense => expense.color),
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



