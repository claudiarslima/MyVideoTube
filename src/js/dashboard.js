(function($) {
  'use strict';
  $(function() {
    if ($("#sales-chart").length) {
      var ctx = document.getElementById('sales-chart').getContext("2d");

      var color = 'rgba(128, 19 ,54, 0.9)';

      var color1 = 'rgba(168, 69, 81, 0.9)';

      var color3 = 'rgba(189, 95, 154, 0.9)';
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [, , , , , , , ,],
              datasets: [
                {
                  label: "Gaming",
                  borderColor: color,
                  backgroundColor: color,
                  pointRadius: 0,
                  fill: false,
                  borderWidth: 1,
                  fill: 'origin',
                  data: [0, 5, 20, 0]
                },
                {
                  label: "Animação",
                  borderColor: color1,
                  backgroundColor: color1,
                  pointRadius: 0,
                  fill: false,
                  borderWidth: 1,
                  fill: 'origin',
                  data: [0, 10, 5, 25, 0]
                },
                  {
                      label: "Desporto",
                      borderColor: color3,
                      backgroundColor: color3,
                      pointRadius: 0,
                      fill: false,
                      borderWidth: 1,
                      fill: 'origin',
                      data: [0, 25, 5, 40, 0]
                  }
            ]
          },
          options: {
              legend: {
                  position: "top"
              },
              scales: {
                xAxes: [{
                  ticks: {
                    display: true,
                    beginAtZero:true,
                    fontColor: 'white'
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false,
                    display:true,
                    color: '#eeeeee',
                  },
                  categoryPercentage: 0.5,
                  ticks: {
                    display: true,
                    beginAtZero: true,
                    stepSize: 10,
                    max: 50,
                    fontColor: 'white'
                  }
                }]
              },
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            })
    }
  });
})(jQuery);