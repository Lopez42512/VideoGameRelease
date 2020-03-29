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
      `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=-dated&page=1&page_size=10&platforms=7,18,1`
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
    console.log(this.state.results);
    const game = this.state.isLoadded ? (
      this.state.results.map(img => (
        <div key={img.id} className="gameContainer">
          <Link to={`/game/${img.id}`}>
            <img
              className="gamePic1"
              src={img.background_image}
              alt="img not avalable"
            />
            {console.log(img.clip.clip)}
            {img.clip.clip === null ? (
              <div>hello</div>
            ) : (
              <video
                className="gamePic"
                poster={img.background_image}
                onMouseOver={event => event.target.play()}
                onMouseOut={event => event.target.pause()}
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
    // console.log(this.state.results[0].clip.clip === true)
    const video = this.state.isLoadded ? (
      <video
        className="gamePic"
        poster={this.state.results[0].background_image}
        onMouseOver={event => event.target.play()}
        onMouseOut={event => event.target.pause()}
        src={this.state.results[0].clip.clip}
        loop
        muted
      ></video>
    ) : (
      <div></div>
    );
    return (
      <div>
        {/* <div className="gameContainer">
          <img
            className="gamePic1"
            // style={{ height: 200, width: 200 }}
            src={this.state.results[0].background_image}
            alt=""
          />
          {video}
        </div> */}
        {game}
      </div>
    );
  }
}
