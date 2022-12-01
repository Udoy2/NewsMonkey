import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
    };
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
          height={4}
        />
        <Navbar />
        <News setProgress={this.setProgress} />
      </div>
    );
  }
}
