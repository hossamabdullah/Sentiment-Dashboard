import {Component, OnDestroy, ViewChild} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SentimentService } from '../../services/Sentiment.service';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  @ViewChild("searchForm") searchForm
  
  private alive = true;
  @ViewChild('searchForm') searchForm;

  constructor(private themeService: NbThemeService, 
    private route: ActivatedRoute, 
    private router: Router,
    private sentimentService: SentimentService) {
  }
  
  ngOnDestroy() {
    this.alive = false;
  }

  showHistory() {
    this.router.navigate(['/pages/history']);
    //, {relativeTo: this.route}
  }

  search() {
    const searchText = this.searchForm.form.controls.text.value
    this.sentimentService.searchText = searchText
    this.sentimentService.performSentiment(searchText)
    console.log(this.sentimentService.searchText)
  }
}
