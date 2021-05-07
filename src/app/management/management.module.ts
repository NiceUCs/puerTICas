import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { CreateUserComponent } from './createuser/createuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    IonicModule,
    ManagementRoutingModule,
  ],
  declarations: [ManagementComponent, CreateUserComponent],
})
export class ManagementModule {}
