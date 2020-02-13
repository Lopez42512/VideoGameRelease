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
      `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=released&page=1&page_size=40&platforms=7,18,1`
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
    this.state.overlay ? (overlayStyle = "0%") : (overlayStyle = "30%");
    const games = this.state.results.map(img => (
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   margin: "auto",
        //   padding: 2,
        //   height: "400px"
        // }}
      >
        <img
          onClick={this.handlesubmit}
          // value={img.clip.video}
          name={img.id}
          style={{ width: "40%", height: 300, position: "relative"}}
          key={img.id}
          src={img.background_image}
          alt="img not avalable"
        />
        <div
          style={{
            position: "relative",
            fontSize: 50,
            textAlign: "center",
            opacity: 0.7,
            width: 600,
            height: "20%",
            top: "0%",
            color: "white",
            backgroundColor: "black"
          }}
        >
          {img.name}
        </div>
      </div>
    ));
    console.log(this.state.results);
    return (
      <div>
        <Header></Header>
        <div className="container">
          <button onClick={this.handleClick}>press me</button>
          <div className="overlay" style={{ width: overlayStyle }}>
            <button onClick={this.handleClick}>press me</button>
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
