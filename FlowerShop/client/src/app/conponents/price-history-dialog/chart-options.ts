import { Options } from "highcharts";

export const options: Options = {
  chart: {
    scrollablePlotArea: {
      minWidth: 700,
    },
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    useHTML: true,
    formatter: function() {
      let result = '<div class="tooltip"><div class="tooltip__date">';
      const day = this.x.toString().substring(0, 2);
      const monthNumber = Number(this.x.toString().substring(3, 5));

      switch(monthNumber) {
        case 1: result += `${day} January`;
        break;
        case 2: result += `${day} February`;
        break;
        case 3: result += `${day} March`;
        break;
        case 4: result += `${day} April`;
        break;
        case 5: result += `${day} May`;
        break;
        case 6: result += `${day} June`;
        break;
        case 7: result += `${day} July`;
        break;
        case 8: result += `${day} August`;
        break;
        case 9: result += `${day} September`;
        break;
        case 10: result += `${day} October`;
        break;
        case 11: result += `${day} November`;
        break;
        case 12: result += `${day} December`;
        break;
      }
      result += '</div>'

      result += `<div class="tooltip__price">${this.y} r.</div>`

      result += '</div>';
      return result;
    },
    shared: false
  },
  xAxis: {
    gridLineWidth: 0,
    crosshair: {
      snap: true,
      width: 1,
      color: '#858585',
    },
    categories: [],
  },
  yAxis: {
    maxPadding: 0.1,
    minPadding: 0,
    gridLineWidth: 0,
    labels: {
      enabled: false,
    },
    title: {
      text: '',
    },
  },
  plotOptions: {
    areaspline: {
      lineColor: '#5E9E5E',
      marker: {
        fillColor: '#5E9E5E',
      },
      fillColor: {
        linearGradient: { x1: 500, x2: 350, y1: 500, y2: 0 },
        stops: [
          [0, 'rgba(94, 158, 94, 0)'],
          [1, 'rgba(94, 158, 94, 0.15)'],
        ],
      },
    },
    series: {
      cursor: 'pointer',
      opacity: 0.5,
      dataLabels: {
        enabled: true,
        y: -10,
        shape: 'callout',
      },
      states: {
        hover: {
          enabled: false
        }
      }
    },
  },
  series: [],
};

