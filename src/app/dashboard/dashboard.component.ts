import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { environment } from '@env/environment';
import { Access } from './access-interface';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  version: string | null = environment.version;
  accessList: Access[] = [];
  columns = [{ name: 'Email' }, { name: 'Name' }, { name: 'Surname' }, { name: 'Access' }];
  temp: any = [];

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.createAccessList();
  }

  createAccessList() {
    this.dashboardService.getAccess().subscribe((accessData) => {
      this.accessList = accessData;
      this.temp = [...accessData];
      console.log(this.accessList);
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.accessList = temp;
    // Whenever the filter changes, always go back to the first page
    this.myFilterTable.offset = 0;
  }
}
