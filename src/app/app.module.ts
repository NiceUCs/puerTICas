import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { ManagementModule } from './management/management.module';
import { ShellModule } from './shell/shell.module';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/* Add Amplify imports */
import Amplify from 'aws-amplify';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

// Configure Amplify resources
Amplify.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_ET2XCCtKe',
  userPoolWebClientId: '3m3dildk65ovivev3kb88ulm2o',
  /*region: environment.region,
  //userPoolId: environment.userPoolId,
  //userPoolWebClientId: environment.userPoolWebClientId,*/
});

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    CoreModule,
    SharedModule,
    ShellModule,
    ManagementModule,
    SettingsModule,
    NgxDatatableModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    AmplifyUIAngularModule, // Add AmplifyUI module
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
