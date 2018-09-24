class Graph {

  constructor(sensorData){
    this.sensorData = sensorData;
  }
  createGraph () {
    let ctx = document.getElementById('graphCanvas');

    let graphCanvas = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          data: this.sensorData,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
