class Graph {
  createGraph () {
    let ctx = document.getElementById('graphCanvas');
    console.log(ctx.innerHTML);
    let graphCanvas = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['10/09/2018', '11/09/2018', '12/09/2018', '13/09/2018', '14/09/2018', '15/09/2018'],
        datasets: [{
          label: 'Temperature',
          data: [12, 19, 3, 5, 2, 3]
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
