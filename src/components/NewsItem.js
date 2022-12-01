import React, { Component } from "react";

export class NewsItem extends Component {
  defaultImageUrl =
    "https://media.nbcphiladelphia.com/2022/11/ground-pic-overbrook-shooting.jpg?quality=85&strip=all&resize=1200%2C675";
  render() {
    let { title, description, imageUrl, newsUrl, name } = this.props;
    return (
      <div className="card  my-2">
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ zIndex: 1 }}
        >
          {name || " "}
        </span>

        <img
          className="card-img-top"
          src={imageUrl || this.defaultImageUrl}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} className="btn btn-dark btn-sm">
            View News
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
