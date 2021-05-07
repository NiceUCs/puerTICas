import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@core';

import { I18nModule } from '@app/i18n';
import { ShellComponent } from './shell.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { SettingsComponent } from '@app/settings/settings.component';
import { ManagementComponent } from '@app/management/management.component';
import { ManagementModule } from '@app/management/management.module';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { SettingsModule } from '@app/settings/settings.module';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          TranslateModule.forRoot(),
          I18nModule,
          IonicModule.forRoot(),
          ManagementModule,
          DashboardModule,
          SettingsModule,
          CoreModule,
        ],
        providers: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [ShellComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
