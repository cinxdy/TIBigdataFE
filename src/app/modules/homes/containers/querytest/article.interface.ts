export interface Article {
    dates: Date,
    titles: string,
    writer: string,
    number: string,
    url: string,
    body: string
}

export interface ArticleSource {
    source: Article
}