import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Router
} from "../../../../node_modules/@angular/router";
import { SentimentService } from "../../services/Sentiment.service";
import { Sentence } from "../../types/Sentence.model";
import { Topic } from "../../types/Topic.model";

@Component({
  selector: "ngx-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  positive: String;
  negative: String;
  neural: String;
  topicId: String;
  sentimentResult: String;
  updateDate: String;

  tweets: Sentence[] = [];
//text-success     text-info      text-danger
  constructor(private route: ActivatedRoute, private router: Router,
          private sentimentService: SentimentService) {
    this.route.queryParams.subscribe(params => {
      this.positive = params["positive"];
      this.negative = params["negative"];
      this.neural = params["neural"];
      this.topicId = params["topicId"];
      this.sentimentResult = params["sentimentResult"];
      this.updateDate = params["updateDate"];

      this.sentimentService.getTweets(this.topicId).subscribe(
        response => {
          this.tweets = response.json()
        },
        error => {
          console.log(error)
        }
      )
    });
  }

  ngOnInit() {}

  backToHistory() {
    this.router.navigate(["/pages/history"]);
  }
}
