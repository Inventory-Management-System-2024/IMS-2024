import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {

  expenses = [
    { category: 'Food', amount: 6000, color: 'rgba(255, 99, 132, 0.8)' },
    { category: 'Travel', amount: 4899, color: 'rgba(54, 162, 235, 0.8)' },
    { category: 'Rent', amount: 8000, color: 'rgba(255, 206, 86, 0.8)' },
    { category: 'Utilities', amount: 1200, color: 'rgba(75, 192, 192, 0.8)' },
    { category: 'Entertainment', amount: 2500, color: 'rgba(153, 102, 255, 0.8)' },
    { category: 'Clothing', amount: 1500, color: 'rgba(255, 159, 64, 0.8)' },
    { category: 'Health', amount: 2000, color: 'rgba(255, 102, 178, 0.8)' },
    { category: 'Education', amount: 3500, color: 'rgba(128, 128, 0, 0.8)' },
    { category: 'Transportation', amount: 3000, color: 'rgba(0, 255, 255, 0.8)' },
    { category: 'Miscellaneous', amount: 2000, color: 'rgba(0, 0, 128, 0.8)' },
  ];

  totalExpense = this.expenses.reduce((total, expense) => total + expense.amount, 0);
  percentages = this.expenses.map(expense => ({
    category: expense.category,
    percentage: (expense.amount / this.totalExpense) * 100,
    color: expense.color
  }));
  constructor() { }

  ngOnInit(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.percentages.map(expense => expense.category),
        datasets: [{
          label: 'Expense Doughnut Chart',
          data: this.percentages.map(expense => expense.percentage),
          backgroundColor: this.percentages.map(expense => expense.color),
          hoverOffset: 2,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: "center",
            labels: {
              padding: 10,
              pointStyle: "circle",
              textAlign: "center",
            },
            display: true,
          }
        }
      }
    });
  }
  // createPieChart() {

  // }
}