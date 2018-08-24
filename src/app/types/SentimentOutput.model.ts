export class SentimentOutput{
    positive: Number;
    negative: Number;
    neural: Number;
    valuesSum: Number;
    sentiment: String;

    constructor(positive, negative, neural, valuesSum, sentiment){
        this.positive = positive;
        this.negative = negative;
        this.neural = neural;
        this.valuesSum = valuesSum;
        this.sentiment = sentiment;
    }
}