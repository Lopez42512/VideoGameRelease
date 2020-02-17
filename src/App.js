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
      overlay: true,
      imageOrVid: true,
      gameClip: "",
      bigImg: "",
      gameImg: [
        "https://media.rawg.io/media/games/fb5/fb5e0fdb1f6bb0e8b5da5d08bb83a5fc.jpg"
      ],
      gameVid: []
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
        this.setState({
          results: results.results,
          targetGame: results.results
        });
      });
  }

  handleClick = () => {
    this.setState({ overlay: !this.state.overlay });
  };

  unClick = () => {
    this.setState({ youtubePage: !this.state.youtubePage, imageOrVid: true, gameVid: [] });
  };

  handlesubmit = event => {
    const { name } = event.target;
    const grabGame = this.state.results.find(id => id.id === parseInt(name));
    console.log(grabGame.id);
    fetch(`https://api.rawg.io/api/games/${grabGame.id}/youtube`)
      .then(response => response.json())
      .then(results => {
        const gamevid = results.results.map(vid => vid.external_id);
        const sliceVid = gamevid.slice(0,7)
        this.setState({ gameVid: sliceVid });
      });
    const grabImg = grabGame.short_screenshots;

    this.setState({
      gameClip: grabGame.clip.video,
      targetGame: grabGame,
      youtubePage: !this.state.youtubePage,
      gameImg: grabImg
    });
  };

  chooseImg = event => {
    const img = event.target.src;
    this.setState({ bigImg: img, imageOrVid: false });
  };
  chooseVid = event => {
    event.target.stopVideo()
    console.log(event.target.b.b.videoId)
    console.log(this.state.targetGame.clip.video)
    this.setState({gameClip: event.target.b.b.videoId })
  }

  render() {
    console.log(this.state.gameVid);
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
      // height: "500px",
      // width: "800px",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    const gameImg = this.state.gameImg.map(img => (
      <img
        onClick={this.chooseImg}
        className="scrollImg"
        src={img.image}
        alt="not found"
      />
    ));
      const gameVids = this.state.gameVid.map(vid => (
      <YouTube
        className="scrollVid"
        onPlay={this.chooseVid}
        videoId={vid}
        opts={{ width: 200, height: 100 }}
        onReady={this._onReady}
      />
    ));
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
          <div>
            <button
              style={{ position: "relative", fontSize: 40, left: "0%" }}
              onClick={this.unClick}
            >
              x
            </button>
            <div className="youtubeContainer">
              <h2 className="gameTitle">{this.state.targetGame.name}</h2>
              <div className="game">
                {this.state.imageOrVid ? (
                  <YouTube
                    className="gameVid"
                    videoId={this.state.gameClip}
                    opts={opts}
                    onReady={this._onReady}
                  />
                ) : (
                  <img
                    className="gameVid"
                    src={this.state.bigImg}
                    alt="not found"
                  />
                )}
              </div>
              <div className="scrollmenu">
                <div className="vidContainer">{gameVids}</div>
                <div className="imgContainer">{gameImg}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
