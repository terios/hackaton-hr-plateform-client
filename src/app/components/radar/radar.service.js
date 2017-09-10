(function() {
  "use strict";

  angular.module("hackatons").factory("radarChart", radarChart);

  /** @ngInject */
  function radarChart() {
    var service = {
      getChartConfig: getChartConfig
    };

    window.chartColors = {
    	red: 'rgb(255, 99, 132)',
    	orange: 'rgb(255, 159, 64)',
    	yellow: 'rgb(255, 205, 86)',
    	green: 'rgb(75, 192, 192)',
    	blue: 'rgb(54, 162, 235)',
    	purple: 'rgb(153, 102, 255)',
    	grey: 'rgb(201, 203, 207)'
    };

    function randomScalingFactor() {
        return Math.round(Math.random() * 100);
    };
    function getChartConfig(title, member) {
      var color = Chart.helpers.color;
      var chartAxes = [];
      var chartDataMin = [];
      var chartDataAvg = [];
      var chartDataMax = [];
      for(var key in member.ratings){
        chartAxes.push(key);
        chartDataMin.push(member.ratings[key].min);
        chartDataAvg.push(member.ratings[key].avg);
        chartDataMax.push(member.ratings[key].max);
      }
      return {
        type: "radar",
        data: {
          labels: chartAxes,
          datasets: [
            {
              label: "Min rating",
              backgroundColor: color(window.chartColors.red)
                .alpha(0.2)
                .rgbString(),
              borderColor: window.chartColors.red,
              pointBackgroundColor: window.chartColors.red,
              data: chartDataMin,
            },{
              label: "Avg rating",
              backgroundColor: color(window.chartColors.blue)
                .alpha(0.2)
                .rgbString(),
              borderColor: window.chartColors.blue,
              pointBackgroundColor: window.chartColors.blue,
              data: chartDataAvg,
            },{
              label: "Max rating",
              backgroundColor: color(window.chartColors.green)
                .alpha(0.2)
                .rgbString(),
              borderColor: window.chartColors.green,
              pointBackgroundColor: window.chartColors.green,
              data: chartDataMax,
            }
          ]
        },
        options: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: title.replace('-', ' ')
          },
          scale: {
            ticks: {
              beginAtZero: true
            }
          }
        }
      };
    }
    return service;
  }
})();
