import { Component, Input, OnInit } from '@angular/core';
import * as highCharts from 'highcharts';
import * as stockharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DashboardService } from '../dashboard.service';
import { dateFormat } from 'highcharts';

exporting(highCharts);

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
})
export class PlotComponent implements OnInit {
  max_date = new Date();
  min_date = new Date().setDate(new Date().getDate() - 1);
  plotData: any;
  data: any = [];
  chart1: any;
  filterSelected: any = '1d';
  @Input() accessList: any;
  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.refreshPlot();

    setTimeout(() => {
      this.saveAccessList();
    }, 1000);
  }

  saveAccessList() {
    this.plotData = this.accessList;
    for (let i = 0; i < this.plotData.length; i++) {
      this.plotData[i].dateCreation = new Date(this.plotData[i].dateCreation).getUTCDate();
      this.data.push([this.plotData[i].dateCreation, 1]);
    }
  }

  filter_dates() {
    this.accessList = this.accessList.filter((a: any) => a > this.min_date && a < this.max_date);
    this.refreshPlot();
  }

  linePlot() {
    /*
  this.chart1 = highCharts.chart('container', {
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }

    },
    yAxis: {
        title: {
            text: 'Wokers'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} access'
    },

    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

    series: [{
        name: "Access",
        //CAMBIAR POR THIS.DATA PERO NO VA ESTO
        data: [
            [Date.UTC(2021, 4, 5,8, 0, 0), 3],
            [Date.UTC(2021, 4, 10,8, 0, 0), 1],
            [Date.UTC(2021, 4, 11,9, 0, 0), 1],
            [Date.UTC(2021, 4, 12,10, 0, 0), 1],
            [Date.UTC(2021, 4, 13,12, 0, 0), 1],
            [Date.UTC(2021, 4, 13,13, 0, 0), 1],
            [Date.UTC(2021, 4, 13,14, 0, 0), 1],
            [Date.UTC(2021, 4, 13,14, 0, 0), 1],
        ]
    }],
    credits: {
      enabled: false,
    },

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },

        }]
    }
});*/
  }

  filter(value: any) {
    this.filterSelected = value;
    switch (value) {
      case '1h':
        this.min_date = new Date().setDate(new Date().getHours() - 1);
        this.filter_dates();
        break;

      case '3h':
        this.min_date = new Date().setDate(new Date().getHours() - 3);
        this.filter_dates();
        break;

      case '12h':
        this.min_date = new Date().setDate(new Date().getHours() - 12);
        this.filter_dates();
        break;

      case '1d':
        this.min_date = new Date().setDate(new Date().getDate() - 1);
        this.filter_dates();
        break;

      case '1w':
        this.min_date = new Date().setDate(new Date().getDate() - 3);
        this.filter_dates();
        break;

      case '1m':
        this.min_date = new Date().setDate(new Date().getDate() - 31);
        this.filter_dates();
        break;

      default:
    }
  }

  refreshPlot() {
    setTimeout(() => {
      this.linePlot();
    }, 500);
  }

  ionViewDidEnter() {
    this.linePlot();
  }
}
