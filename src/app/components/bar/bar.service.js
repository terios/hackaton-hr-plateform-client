(function() {
  "use strict";

  angular.module("hackatons").factory("barChart", barChart);

  /** @ngInject */
  function barChart() {
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
        return Math.round(Math.random() * 5);
    };
    function randomColor() {
        return window.chartColors[Object.keys(window.chartColors)[Math.round(Math.random() * 7)]];
    };
    function getChartConfig(title, results) {
      var color = Chart.helpers.color;
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      var dataSet=[];
      results.map(function(elm){
        var teamColor = randomColor()
        var tmp = {
          label: elm.team,
          backgroundColor: color(teamColor).alpha(0.5).rgbString(),
          borderColor: teamColor,
          borderWidth: 1,
          data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              elm.avg,
              0,
              0,
              0,
              0
          ]
        }
        dataSet.push(tmp);
      })
      return {
                type: 'bar',
                data: {
                  labels: ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"],
                  datasets: dataSet
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
        }
    }
    return service;
  }
})();
