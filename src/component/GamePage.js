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
  const [bigImg, setbigImg] = useState("");
  const [bigVid, setbigVid] = useState("");
  const [playVid, setplayVid] = useState(true);

  //setting up the function the onMount will call to set the result into their respected places

  function setGame(x, y, z) {
    setGameDesc(x);
    setGameVideo(y);
    setGameImages(z);
    setbigVid(y.results[0].external_id);
    setbigImg(z.results[0].image);
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
            onClick={chooseImg}
            key={img.id}
            className="scrollImg"
            src={img.image}
            alt="not found"
          />
        ))
      : console.log("no images");

  // the onclick for the images on the scrollbar this display the image that is clicked onto the big screen

  function chooseImg(event) {
    const { src } = event.target;
    setbigImg(src);
    setimageOrVid(false);
  }

  // mapping through the videos to display all of them for the selected game on the scrollbar

  const videosOnScrollBar =
    gameVideo.results !== undefined
      ? gameVideo.results.map(vid => (
          <YouTube
            onPlay={chooseVid}
            key={vid.id}
            className="scrollVid"
            videoId={vid.external_id}
            // opts={opts}
            // onReady={this._onReady}
          />
        ))
      : console.log("no videos");

  // the onclick for the Videos on the scrollbar this display the video that is clicked onto the big screen
  function chooseVid(event) {
    if (window.innerWidth > 500) {
      event.target.stopVideo();
    }
    console.log(event.target.g.g.videoId);
    // this.setState({ gameClip: event.target.b.b.videoId, imageOrVid: true });
    setbigVid(event.target.g.g.videoId);
    setimageOrVid(true);
  }
  const videosOnScrollBarSliced =
    videosOnScrollBar !== undefined
      ? videosOnScrollBar.slice(0, 6)
      : console.log("no videos");
  
  return (
    <div className="youtubeContainer">
      <h2 className="gameTitle">{gameDesc.name}</h2>
      <div className="game">
        {imageOrVid ? (
          <YouTube
            className="gameVid"
            videoId={bigVid}
            // opts={opts}
            onReady={_onReady}
          />
        ) : (
          <img className="gameVid" src={bigImg} alt="not found" />
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
  function _onReady(event) {
    console.log("heloo")
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  }
}

export default GamePage;
