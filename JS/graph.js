class Graph {

  constructor(sensorData){
    this.sensorData = [];
    this.sensorData = sensorData;
    this.graph = null;
  }
  createGraph () {
    let ctx = document.getElementById('graphCanvas');

    let timeLabels = this.getTimes();
    let readings = this.getReadings();
    this.graph = new Chart(ctx, {
      type: 'line',

      data: {
        labels: timeLabels,
        datasets: [{
          data: readings,
          borderColor: 'red',
          backgroundColor:'rgba(0,0,0,0)'
        }]
      },
      options: {
        title:{

          display:true,
          text:this.sensorData[this.sensorData.length-1].date,
          position:'top',
          
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
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

  updateGraph(sensorData){
    this.sensorData = sensorData;
    let label = this.getTimes();
    
    let dataset = this.getReadings();

    this.graph.data.labels.push(label);
    this.graph.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    this.graph.update();
  }

  
  removeData() {
  this.graph.data.labels.pop();
  this.graph.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  this.graph.update();
}
}
