import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PlotComponent } from './plot/plot.component';

@NgModule({
  imports: [CommonModule, TranslateModule, IonicModule, DashboardRoutingModule, NgxDatatableModule],
  declarations: [DashboardComponent, PlotComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
