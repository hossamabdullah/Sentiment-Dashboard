class Sentence{
    sentenceId: String;
    content: String;
    sentiment: String;
    NERKeywords: String[];
    TopicModelingValues: String[];
    topic: String;

    constructor(sentenceId, content,
        sentiment, NERKeywords, TopicModelingValues, topic){
        this.sentenceId = sentenceId;
        this.content = content;
        this.sentiment = sentiment;
        this.NERKeywords = NERKeywords;
        this.TopicModelingValues = TopicModelingValues;
        this.topic = topic;
    }
}