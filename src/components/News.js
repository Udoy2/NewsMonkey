import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";

export class News extends Component {
  apiKey = process.env.REACT_APP_API;
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 8,
      totalResults: 0,
    };

    
  }
  /**
   * fetchData handles api request to server return promise
   * @param {number} pageNum its the pageNumber of api
   * @returns a promise that will give the total results from the fetch data
   */
  fetchData = async (pageNum) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.apiKey}&page=${pageNum}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  componentDidMount() {
    this.props.setProgress(10);
    this.fetchData(this.state.page);
    this.props.setProgress(100);
  }

  render() {
    return (
      <>
        <div className="container d-flex justify-content-between my-3">
          <h3 className="fw-bold">This is a news component</h3>
        </div>
        {this.state.articles !== null ? (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={() => {
              let pageNum = this.state.page + 1;
              this.setState({ page: pageNum });
              this.fetchData(pageNum);
            }}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No news for today! </b>
              </p>
            }
          >
            <div className="container">
              <div className="row justify-content-between">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-3 col-sm-6">
                      <NewsItem
                        key={element.url}
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        name={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          " "
        )}
      </>
    );
  }
}

export default News;
