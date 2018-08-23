export class Topic{
    topicId: String;
    keyword: String;
    goodReviewNum: Number;
    badReviewNum: Number;
    neuralReviewNum: Number;
    sentimentResult: String;
    updateDate: String;

    constructor(topicId, keyword, 
        goodReviewNum, badReviewNum, neuralReviewNum,
        sentimentResult, updateDate){
        this.topicId = topicId;
        this.keyword = keyword;
        this.goodReviewNum = goodReviewNum;
        this.badReviewNum = badReviewNum;
        this.neuralReviewNum = neuralReviewNum;
        this.sentimentResult = sentimentResult;
        this.updateDate = updateDate;
    }
}