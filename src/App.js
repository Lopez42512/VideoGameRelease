import React, { Component } from "react";
// import YouTube from "react-youtube";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      overlay: true
    };
  }

  componentDidMount() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = year + "-0" + month + "-" + day;
    const endDate = year + 5 + "-0" + month + "-" + day;
    fetch(
      `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=-rating&page=1&page_size=26&platforms=7,18,1`
    )
      .then(response => response.json())
      .then(results => {
        this.setState({ results: results.results });
      });
  }

  handleClick = () => {
    this.setState({ overlay: !this.state.overlay });
  };

  render() {
    let overlayStyle;
    this.state.overlay ? (overlayStyle = "0%") : (overlayStyle = "50%");
    const games = this.state.results.map(img => (
      <div className="gameContainer">
        <img
          onClick={this.handlesubmit}
          // value={img.clip.video}
          name={img.id}
          className="gamePic"
          key={img.id}
          src={img.background_image}
          alt="img not avalable"
        />
        <div className="picText">{img.name}</div>
      </div>
      
    ));

    console.log(this.state.results);
    return (
      <div>
        <Header handleClick={this.handleClick}></Header>

        <div className="container">
          <div className="overlay" style={{ width: overlayStyle }}>
            <form>
              <input></input>
              <input></input>
              <input></input>
            </form>
          </div>
          {games}
        </div>
      </div>
    );
  }
}

export default App;
