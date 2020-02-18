import React, { Component } from "react";
import YouTube from "react-youtube";
import Header from "./Header";
import Interweave from "interweave";
//add a sumary of the game and add a link to where to buy the game

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      targetGame: [],
      youtubePage: true,
      overlay: true,
      pageNum: 1,
      overlayStyle: "315px",
      imageOrVid: true,
      fetchUrl: "",
      gameClip: "",
      bigImg: "",
      // gameDesc: "",
      stores: [],
      gameImg: [
        "https://media.rawg.io/media/games/fb5/fb5e0fdb1f6bb0e8b5da5d08bb83a5fc.jpg"
      ],
      gameVid: []
    };
  }

  componentDidMount() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = year + "-0" + month + "-" + day;
    const endDate = year + 5 + "-0" + month + "-" + day;
    fetch(
      `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=-rating&page=${this.state.pageNum}&page_size=26&platforms=7,18,1`
    )
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.setState({
          results: results.results,
          targetGame: results.results,
          fetchUrl: results.next
        });
      });
  }

  handleClick = () => {
    this.setState({ overlay: !this.state.overlay });
  };

  unClick = () => {
    this.setState({
      youtubePage: !this.state.youtubePage,
      imageOrVid: true,
      gameVid: []
    });
  };

  handlesubmit = event => {
    window.scrollTo(0, 0);
    const { name } = event.target;
    const grabGame = this.state.results.find(id => id.id === parseInt(name));
    fetch([`https://api.rawg.io/api/games/${grabGame.id}/youtube`])
      .then(response => response.json())
      .then(results => {
        const gamevid = results.results.map(vid => vid.external_id);
        const sliceVid = gamevid.slice(0, 7);
        this.setState({ gameVid: sliceVid });
      });
    fetch(`https://api.rawg.io/api/games/${grabGame.id}`)
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.setState({ gameDesc: results.description });
      });
    const grabImg = grabGame.short_screenshots;
    const ifVidorNot =
      grabGame.clip === null ? "aDm5WZ3QiIE" : grabGame.clip.video;
    this.setState({
      gameClip: ifVidorNot,
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
    if (window.innerWidth > 500) {
      event.target.stopVideo();
    }
    this.setState({ gameClip: event.target.b.b.videoId, imageOrVid: true });
  };
  newPage = event => {
    const { name } = event.target;
    name === "next"
      ? this.setState({ pageNum: (this.state.pageNum += 1) })
      : this.state.pageNum === 1
      ? this.setState({ pageNum: 1 })
      : this.setState({ pageNum: (this.state.pageNum -= 1) });
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = year + "-0" + month + "-" + day;
    const endDate = year + 5 + "-0" + month + "-" + day;
    fetch(
      `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=-rating&page=${this.state.pageNum}&page_size=26&platforms=7,18,1`
    )
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.setState({
          overlay: !this.state.overlay,
          results: results.results,
          targetGame: results.results,
          fetchUrl: results.next
        });
      });
  };

  render() {
    let overlayStyle;
    this.state.overlay
      ? (overlayStyle = "0%")
      : (overlayStyle = this.state.overlayStyle);
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
    // const fixDesc = this.state.gameDesc.replace(/"/g,)
    return (
      <div>
        <Header handleClick={this.handleClick}></Header>
        {this.state.youtubePage ? (
          <div className="container">
            <div className="overlay" style={{ width: overlayStyle }}>
              <div className="overlayBackgroundColor" />
              <div className="overlayEverything">
                <form>
                  <input
                    placeholder="&#x1F50D;"
                    style={{ width: 250, height: 25, marginTop: 20 }}
                  ></input>
                </form>
                <div className="pageButtons">
                  <button onClick={this.newPage} name="prev">
                    Previous Page
                  </button>
                  <button onClick={this.newPage} name="next">
                    Next Page
                  </button>
                </div>
              </div>
            </div>
            {games}
          </div>
        ) : (
          <div>
            {/* <button
              style={{ position: "relative", fontSize: 40, left: "0%" }}
              onClick={this.unClick}
            >
              x
            </button> */}
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
            <div className="gameDescriptionContainer">
              <div className="gameDescription">
                <Interweave content={this.state.gameDesc} />
              </div>
            </div>
            <div className="blankContainer" />
          </div>
        )}
      </div>
    );
  }
}

export default App;
