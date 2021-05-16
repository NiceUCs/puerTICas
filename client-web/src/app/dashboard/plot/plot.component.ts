import { Component, Input, OnInit } from '@angular/core';
import * as highCharts from 'highcharts';
import * as stockharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import { DashboardService } from '../dashboard.service';
import { dateFormat } from 'highcharts';
import * as moment from 'moment';
import * as _ from 'lodash';

exporting(highCharts);

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
})
export class PlotComponent implements OnInit {
  max_date = new Date().getTime();
  min_date = new Date().getTime() - 7 * 24 * 60 * 60000;
  plotData: any;
  data: any = [];
  data_transformed: any = [];
  chart1: any;
  total_access: any;
  access_today: any;
  @Input() accessList: any;
  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.saveAccessList();
    }, 1000);
  }

  saveAccessList() {
    this.plotData = this.accessList;
    for (let i = 0; i < this.plotData.length; i++) {
      this.plotData[i].dateCreation = new Date(this.plotData[i].dateCreation);
      this.data.push(this.plotData[i].dateCreation);
    }
    this.total_access = this.plotData.length;

    let grouped_data = this.groupday(this.data);
    for (let i = 0; i < grouped_data.length; i++) {
      console.log(new Date(grouped_data[i].day).getTime() + 7200);
      this.data_transformed.push([
        new Date(grouped_data[i].day).getTime() + 24 * 60 * 60000,
        grouped_data[i].times.length,
      ]);
    }
    this.access_today = this.data_transformed[this.data_transformed.length - 1][1];

    console.log(this.data_transformed);
    this.linePlot(this.data_transformed, this.min_date);
  }

  groupday(ocurrence: any) {
    var occurrenceDay = function (occurrence: any) {
      return moment(occurrence).startOf('day').format();
    };

    var groupToDay = function (group: any, day: any) {
      return {
        day: day,
        times: group,
      };
    };

    var result = _.chain(ocurrence).groupBy(occurrenceDay).map(groupToDay).sortBy('day').value();

    return result;
  }

  linePlot(data: any, min: any) {
    this.chart1 = highCharts.chart('container', {
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
        min: min,
      },
      yAxis: {
        title: {
          text: 'Nº Access',
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      plotOptions: {
        series: {
          color: 'green',
        },
        line: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
        },
      },
      exporting: {
        chartOptions: {
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
              },
            },
          },
        },
        scale: 3,
        fallbackToExportServer: false,
      },
      series: [
        {
          name: 'Access',
          type: 'line',
          data: data,
          marker: {
            lineWidth: 2,
            lineColor: highCharts.getOptions().colors[7],
            fillColor: 'white',
            enabled: false,
          },
        },
      ],
      credits: {
        enabled: false,
      },

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
              },
              yAxis: {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -5,
                },
                title: {
                  text: null,
                },
              },

              subtitle: {
                text: null,
              },
              credits: {
                enabled: false,
              },
            },
          },
        ],
      },
    });
  }

  filter(value: any) {
    console.log(value);
    switch (value) {
      case '3d':
        this.min_date = new Date().getTime() - 3 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      case '1w':
        this.min_date = new Date().getTime() - 7 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      case '2w':
        this.min_date = new Date().getTime() - 14 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      case '3w':
        this.min_date = new Date().getTime() - 21 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      case '1m':
        this.min_date = new Date().getTime() - 31 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      case '3m':
        this.min_date = new Date().getTime() - 3 * 31 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      case '1y':
        this.min_date = new Date().getTime() - 12 * 31 * 24 * 60 * 60000;
        this.linePlot(this.data_transformed, this.min_date);
        break;
      default:
    }
  }
}
