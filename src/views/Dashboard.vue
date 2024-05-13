<template>
    <v-container>
      <v-row>
        <!-- Card -->
        <v-col cols="3" style="margin-top: 4%;">
          <v-card max-width="344" prepend-icon="mdi mdi-email-check" subtitle="Nombre de courrier enregistré" title="Courrier Reçu">
            <v-card-text style="font-size: 50px;">{{ courrierCount }}</v-card-text>
          </v-card>
        </v-col>
  
        <!-- Chart -->
        <v-col cols="6">
          <canvas id="myChart" style="max-width: 800px; height: auto; margin-top: 80px;"></canvas>
        </v-col>
  
        <!-- Date -->
        <v-col cols="3" style="margin-top: 4%;">
          <v-date-picker v-model="selectedDate" show-adjacent-months></v-date-picker>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import axios from 'axios';
  Chart.register(...registerables);
  
  export default {
    name: 'MyDashboard',
    data() {
      return {
        selectedDate: new Date(),
        chart: null,
        courrierCount: 0
      };
    },
    mounted() {
      this.fetchCourrierCount(); // Only call fetchCourrierCount here
    },
    methods: {
      async fetchCourrierCount(){
      try {
        const response = await axios.get('http://localhost:3000/list/count')
        this.courrierCount = response.data.count
        this.renderChart(); // Call renderChart here after courrierCount is updated
        this.updateChartData(this.courrierCount); // Update the chart data
      } catch (error) {
        console.error('Erreur lors de la recuperation des informations', error)
      }
    },
      renderChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Série 1',
                data: Array(12).fill(this.courrierCount), // Initialize the chart with the current courrierCount
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      updateChartData(courrierCount) {
        this.chart.data.datasets[0].data = Array(12).fill(courrierCount); // Update the chart data with the new courrierCount
        this.chart.update(); // Update the chart
      },
    },
  };
  </script>
  
  