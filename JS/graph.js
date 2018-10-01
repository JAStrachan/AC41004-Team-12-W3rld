class Graph {

  constructor(sensorData){
    this.sensorData = [];
    this.sensorData = sensorData;
    this.graph = null;
  }

  // generates a line graph and displays it in the canvas in the popup
  createGraph () {
    let ctx = document.getElementById('graphCanvas');

    let timeLabels = this.getTimes();
    let readings = this.getReadings();
    if(this.graph != null)
    {
      this.graph.destroy();
    }
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

  // loads the times from the list of readings and set them as the x-axis labels
  getTimes() {
    let timeLabels = [];

    for(i=0; i< this.sensorData.length; i++)
    {
      timeLabels.push(this.sensorData[i].time);
    }

    return timeLabels;
  }

  // get the sensor reading values from the list of readings to plot on the graph
  getReadings() {
    let readings = [];

    for(i=0; i< this.sensorData.length; i++)
    {
      readings.push(this.sensorData[i].reading);
    }

    return readings;
  }

  // removes the old graph and creates a newer, more up to date one
  updateGraph(sensorData){
    this.sensorData = sensorData;
    this.graph.destroy();
    this.createGraph();
  }
}
