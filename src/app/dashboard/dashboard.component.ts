import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { environment } from '@env/environment';
import { Access } from './access-interface';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DashboardService } from './dashboard.service';
import { EmailValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  version: string | null = environment.version;
  accessList: any[] = [];
  columns = [{ prop: 'dateCreation', name: 'Access' }, { name: 'Email' }, { prop: 'data', name: 'Full Name' }];
  temp: any = [];

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    this.createAccessList();
  }

  createAccessList() {
    this.dashboardService.getAccess().subscribe((accessData) => {
      console.log(accessData[0].email);
      this.accessList = accessData;

      for (let i = 0; i < this.accessList.length; i++) {
        this.accessList[i].data = this.accessList[i].data.name + ' ' + this.accessList[i].data.surname;
        this.accessList[i].dateCreation =
          new Date(this.accessList[i].dateCreation).getDay() +
          '/' +
          new Date(this.accessList[i].dateCreation).getMonth() +
          '/' +
          new Date(this.accessList[i].dateCreation).getFullYear() +
          ' - ' +
          new Date(this.accessList[i].dateCreation).getHours() +
          ':' +
          new Date(this.accessList[i].dateCreation).getMinutes();
      }
      this.temp = [...this.accessList];
      console.log(this.accessList);
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.dateCreation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.accessList = temp;
    // Whenever the filter changes, always go back to the first page
    this.myFilterTable.offset = 0;
  }
}
