import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HistoryComponent } from './history/history.component';
import { ChartsModule } from './charts/charts.module';
import { DetailsComponent } from './details/details.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    ChartsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    HistoryComponent,
    DetailsComponent,
  ],
})
export class PagesModule {
}
