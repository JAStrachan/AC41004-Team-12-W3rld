class Graph {

  constructor(sensorData){
    this.sensorData = [];
    this.sensorData = sensorData;
  }
  createGraph () {
    let ctx = document.getElementById('graphCanvas');

    let timeLabels = this.getTimes();
    let readings = this.getReadings();
    let graphCanvas = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [{
          data: readings,
        }]
      },
      options: {
        legend: {
          display: false
        },
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

  getTimes() {
    let timeLabels = [];
    for(i=0; i< this.sensorData.length; i++)
    {
      timeLabels.push(this.sensorData[i].time);
    }
    return timeLabels;
  }

  getReadings() {
    let readings = [];
    for(i=0; i< this.sensorData.length; i++)
    {
      readings.push(convert("C", this.sensorData[i].reading));
    }
    return readings;
  }
}
