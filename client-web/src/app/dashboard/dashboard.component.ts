import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '@env/environment';
import { DashboardService } from './dashboard.service';
import { Auth } from 'aws-amplify';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Access } from './access-interface';
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  version: string | null = environment.version;
  accessList: any[];
  loading = false;
  columns = [
    { prop: 'dateCreation', name: 'Access' },
    { prop: 'email', name: 'Email' },
    { prop: 'data', name: 'Full Name' },
  ];
  temp: any = [];

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    this.createAccessList();
  }

  createAccessList() {
    this.dashboardService.getAccess().subscribe((accessData: any) => {
      this.accessList = accessData;

      for (let i = 0; i < accessData.length; i++) {
        this.accessList[i].data = this.accessList[i].data.name + ' ' + this.accessList[i].data.surname;
        //this.accessList[i].dateCreation = this.accessList[i].dateCreation;
      }
      console.log(this.accessList);
      this.temp = [...this.accessList];
    });
  }
  //Refresh the users
  refreshUserList(event: any) {
    setTimeout(() => {
      this.createAccessList();
      event.target.complete();
    }, 2000);
  }

  updateFilter(event: any) {
    const val = event.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.data.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.accessList = temp;
    // Whenever the filter changes, always go back to the first page
    this.myFilterTable.offset = 0;
  }
  async signOut() {
    try {
      sessionStorage.removeItem('authorization');
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
