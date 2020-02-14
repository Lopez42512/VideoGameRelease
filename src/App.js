import React, { Component } from "react";
import YouTube from "react-youtube";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      targetGame: [],
      youtubePage: true,
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

  handlesubmit = event => {
    const { name } = event.target;
    const grabGame = this.state.results.find(id => id.id === parseInt(name));
    console.log(grabGame);
    this.setState({
      targetGame: grabGame,
      youtubePage: !this.state.youtubePage
    });
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
    const opts = {
      height: "500px",
      width: "800px",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <div>
        <Header handleClick={this.handleClick}></Header>
        {this.state.youtubePage ? (
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
        ) : (
          <div className="youtubeContainer">
            {/* <button style={{position:"absolute", fontSize: 40 }} onClick={this.handlesubmit}>
              x
            </button> */}
            <h2 className="gameTitle">{this.state.targetGame.name}</h2>
            <div className="game">
              <YouTube
                videoId={this.state.targetGame.clip.video}
                opts={opts}
                onReady={this._onReady}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
