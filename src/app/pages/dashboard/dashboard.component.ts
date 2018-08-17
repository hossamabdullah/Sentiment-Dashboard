import {Component, OnDestroy, ViewChild} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  @ViewChild('searchForm') searchForm;
  
  constructor(private themeService: NbThemeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  showHistory() {
    this.router.navigate(['/pages/history']);
    //, {relativeTo: this.route}
  }
}
