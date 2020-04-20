import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import ReactPlayer from "react-player";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      results: [""],
      isLoadded: false
    };
  }
  componentDidMount() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    day - 10 < 0 ? (day = "0" + day) : console.log(day);
    const newdate = year + "-0" + month + "-" + day;
    const endDate = year + 5 + "-0" + month + "-" + day;
    // console.log(newdate)
    // console.log(endDate)

    fetch(
      //&platforms=7,18,1
      `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=-dated&page=1&page_size=100`
    )
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.setState({
          results: results.results,
          isLoadded: true
        });
      });
  }
  componentWillUnmount() {
    this.setState({ isLoadded: false });
  }

  // onHover = event => {
  //   console.log(event.target)
  // };
  // onHoverLeave = () => {
  //   console.log("goodbye");
  // };
  render() {
    // console.log(this.state.results);
    const game = this.state.isLoadded ? (
      this.state.results.map(img => (
        <div key={img.id} className="gameContainer">
          {img.clip === null ? console.log(null) : console.log("not null")}
          <Link to={`/game/${img.id}`}>
            {img.clip === null ? (
              <img
                className="gamePic"
                src={img.background_image}
                alt="img not avalable"
              />
            ) : (
              <video
                className="gamePic"
                poster={img.background_image}
                onMouseOver={event => event.target.play()}
                onMouseOut={event => event.target.load()}
                src={img.clip.clip}
                loop
                muted
              ></video>
            )}
            <div className="picText">{img.name}</div>
          </Link>
        </div>
      ))
    ) : (
      <div className="loadingContainer">
        <ReactLoading
          type={"bars"}
          color={"blue"}
          height={"100px"}
          width={"100px"}
        />
      </div>
    );
    return <div>{game}</div>;
  }
}
