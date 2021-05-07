import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'tabs/management', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
