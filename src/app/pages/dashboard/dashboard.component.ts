import {Component, OnDestroy, ViewChild, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SentimentService } from '../../services/Sentiment.service';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy, OnInit {

  private alive = true;
  sentiment: String;
  desc: String;
  @ViewChild('searchForm') searchForm;

  constructor(private themeService: NbThemeService, 
    private route: ActivatedRoute, 
    private router: Router,
    private sentimentService: SentimentService) {
  }
  
  ngOnInit(){
    this.sentimentService.subject.subscribe(elements => {
      console.log("bbbbbbbbbb")
      console.log(elements)
      this.sentiment = elements['sentiment']
      if(this.sentiment == 'POSITIVE')
        this.desc = 'This topic have good sentiment on twitter.'
      if(this.sentiment == 'NEGATIVE')
        this.desc = 'This topic have bad sentiment on twitter.'
      if(this.sentiment == 'NEURAL')
        this.desc = 'This topic have neural sentiment on twitter.'
    })
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
