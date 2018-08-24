import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SentimentService } from '../../services/Sentiment.service';
import { Topic } from '../../types/Topic.model';

@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input()
  searchKeyword: String;
  topics : Topic[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
        private sentimentService: SentimentService) { }

  ngOnInit() {
    this.sentimentService.getSentiments(this.searchKeyword).subscribe(
      response => {
        this.topics = response.json()
      },
      error => {
        console.log(error)
      }
    )
  }

  show_details(topic: Topic) {
    console.log(topic)
    this.router.navigate(['/pages/details'], 
          { queryParams: { positive: topic.goodReviewNum,
                          negative: topic.badReviewNum,
                          neural: topic.neuralReviewNum,
                          topicId: topic.topicId,
                          sentimentResult: topic.sentimentResult,
                          updateDate: topic.updateDate} });
  }
}
