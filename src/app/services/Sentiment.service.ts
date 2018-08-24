import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {SentimentOutput} from '../types/SentimentOutput.model';


@Injectable()
export class SentimentService {
    searchText: String;
    public subject:Subject<any> = new Subject();


    constructor(private http: Http) {}

    performSentiment(key: String) {
        return this.http.get('http://127.0.0.1:3003/sentiment/online?keyword='+key).subscribe(
            response => {
                let sentimentOutput = response.json();
                this.emitSearchDone(sentimentOutput);
            },
            error =>{
                console.log(error)
            }
        )
    }


    getSentiments(key: String){
        return this.http.get('http://127.0.0.1:3003/historyOfTopics?topic='+key);
    }

    getTweets(sentimentId: String){
        this.http.get('http://127.0.0.1:3003/historyOfSentences?topic='+sentimentId)
    }

    emitSearchDone(sentimentOutput: SentimentOutput){
        console.log("aaaa")
        // let data = {
        //     Positive: 1548,
        //     Negative: 335,
        //     Neural: 310
        // }
        this.subject.next(sentimentOutput);
    }
    
}