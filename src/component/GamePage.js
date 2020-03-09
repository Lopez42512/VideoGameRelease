import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Interweave from "interweave";

function GamePage() {
  const { gameId } = useParams();
  const [gameVideo, setGameVideo] = useState([]);
  const [gameDesc, setGameDesc] = useState([]);
  const [gameImages, setGameImages] = useState([]);
  const [imageOrVid, setimageOrVid] = useState(true);

  //setting up the function the onMount will call to set the result into their respected places

  function setGame(x, y, z) {
    setGameDesc(x);
    setGameVideo(y);
    setGameImages(z);
  }

  //onmount to get the games information and place the information into the proper state to be called later

  useEffect(() => {
    Promise.all([
      fetch(`https://api.rawg.io/api/games/${gameId}`),
      fetch(`https://api.rawg.io/api/games/${gameId}/youtube`),
      fetch(`https://api.rawg.io/api/games/${gameId}/screenshots`)
    ])
      .then(([res1, res2, res3]) =>
        Promise.all([res1.json(), res2.json(), res3.json()])
      )
      .then(([data1, data2, data3]) => setGame(data1, data2, data3));
  }, []);

  // mapping through the images to display all the screenshots for the selected game on the scrollbar

  const imageOnScrollBar =
    gameImages.results !== undefined
      ? gameImages.results.map(img => (
          <img
            // onClick={this.chooseImg}
            key={img.id}
            className="scrollImg"
            src={img.image}
            alt="not found"
          />
        ))
      : console.log("no images");

  // checking to see if the api has loaded to display the main video on the page so the page won't crash

  const youtubeId =
    gameVideo.results !== undefined
      ? gameVideo.results[0].external_id
      : "undefined";

  // mapping through the videos to display all of them for the selected game on the scrollbar

  const videosOnScrollBar =
    gameVideo.results !== undefined
      ? gameVideo.results.map(vid => (
          <YouTube
            key={vid.id}
            className="scrollVid"
            videoId={vid.external_id}
            // opts={opts}
            // onReady={this._onReady}
          />
        ))
      : console.log("no videos");
  const videosOnScrollBarSliced = videosOnScrollBar !== undefined ? videosOnScrollBar.slice(0,6) : console.log("no videos")

  return (
    <div className="youtubeContainer">
      <h2 className="gameTitle">{gameDesc.name}</h2>
      <div className="game">
        {imageOrVid ? (
          <YouTube
            className="gameVid"
            videoId={youtubeId}
            // opts={opts}
            // onReady={this._onReady}
          />
        ) : (
          <img className="gameVid" src={this.state.bigImg} alt="not found" />
        )}
      </div>
      <div className="scrollmenu">
        <div className="vidContainer">{videosOnScrollBarSliced}</div>
        <div className="imgContainer">{imageOnScrollBar}</div>
      </div>
      <div className="gameDescriptionContainer">
        <div className="gameDescription">
          <Interweave content={gameDesc.description} />
        </div>
      </div>
      <div className="blankContainer" />
    </div>
  );
}

export default GamePage;

