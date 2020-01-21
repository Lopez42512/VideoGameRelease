import React, { Component } from "react";
import YouTube from "react-youtube";
// npm install react-youtube

class App extends Component {
  constructor() {
    super();
    this.state = {
      number: 1,
      color: "blue",
      result: [],
      videoId: "",
      click: false
    };
  }

  handlesubmit = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(value);
    // name === "hello" ? this.setState({ number: 0 }) : this.setState({ number: 1, color: "green" })
    console.log(name);
    this.setState({ videoId: name, click: !this.state.click });
  };

  componentDidMount() {
    fetch(
      "https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added"
    )
      .then(res => res.json())
      .then(results => {
        this.setState({ result: results.results });
      });
  }

  render() {
    console.log(this.state.result);
    console.log(this.state.click);
    const gameImg = this.state.result.map(img => (
      <div style={{ position: "relative", textAlign: "center", margin: "auto", padding: 2 }}>
        <img
          onClick={this.handlesubmit}
          value={img.clip.video}
          name={img.clip.video}
          style={{ width: "75%"}}
          key={img.id}
          src={img.background_image}
          alt="img not avalable"
        />
        <div style={{position: "absolute" , fontSize: 50 , opacity: .7 ,width: "75%" , height: "10%" ,top: "80%", left: "12.5%" ,color:"white", backgroundColor: "black"}}>{img.name}</div>
      </div>
    ));

    const opts = {
      height: "390",
      width: "50%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    // const display =
    //     this.state.click === false ? <div>{gameImg}</div>   : <YouTube
    //         videoId={this.state.videoId}
    //         opts={opts}
    //         onReady={this._onReady}
    //     />

    return (
      <div>
        {this.state.click === false ? (
          <div>{gameImg}</div>
        ) : (
          <div>
            <button style={{ fontSize: 40 }} onClick={this.handlesubmit}>
              x
            </button>
            <YouTube
              videoId={this.state.videoId}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
        )}
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default App;
