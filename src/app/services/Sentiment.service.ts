import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class SentimentService {
    searchText: String;

    constructor(private http: Http) {}

    performSentiment(key: String) {
        return this.http.get('http://localhost:3003/sentiment/online?keyword='+key);
    }


    getSentiments(key: String){
        return this.http.get('http://localhost:3003/historyOfTopics?topic='+key);
    }

    getTweets(sentimentId: String){
        return this.http.get('http://localhost:3003/historyOfSentences?topic='+sentimentId);
    }
    
}