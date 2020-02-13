// import React, { Component } from "react";
// import YouTube from "react-youtube";
// // npm install react-youtube

// //ideas for app, add features such as search for games sort by most popular,release date etc... how many games to display at once,what years to sort by  

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       number: 1,
//       color: "blue",
//       result: [],
//       videoId: "",
//       click: false,
//       fetchUrl:"",
//       date: "",
//       pagenum: 1
//     };
//   }

//   handlesubmit = event => {
//     event.preventDefault();
//     const { name } = event.target;
//     console.log(typeof(name))
//     const game = this.state.result.find(x => x.id === parseInt(name))
//     const gameUrl =game.clip.video

//     // name === "hello" ? this.setState({ number: 0 }) : this.setState({ number: 1, color: "green" })
//     // console.log(name);
//     gameUrl === null ? this.setState({ click: !this.state.click }) : this.setState({ videoId: gameUrl, click: !this.state.click }) 
    
//   };

//   componentDidMount() {
//     var dateObj = new Date();
//     var month = dateObj.getUTCMonth() + 1; //months from 1-12
//     var day = dateObj.getUTCDate();
//     var year = dateObj.getUTCFullYear();

//     const newdate = year + "-0" + month + "-" + day;
//     const endDate = year+5 + "-0" + month + "-" + day;
//     // console.log(newdate)
//     fetch(
//       `https://api.rawg.io/api/games?dates=${newdate},${endDate}&ordering=released&page=1&page_size=40&platforms=7,18,1`
//       // `https://api.rawg.io/api/games?dates=2012-01-01,${newdate}&ordering=-rating`
//       //Code below is starting point for searching for games 
//       // "https://api.rawg.io/api/games"
//     )
//       .then(res => res.json())
//       .then(results => {
//         // console.log(results);
//         this.setState({ result: results.results, fetchUrl: results.next});
//       });
//   }
//   nextPage = () => {
//     // console.log("hello");
//     this.setState({pagenum: this.state.pagenum = this.state.pagenum + 1})
//     //for next page to work I'm thinking about sending the fetch url into state and than ill call it and add the next page number
//     fetch(
//       this.state.fetchUrl
//       // "https://api.rawg.io/api/games?dates=2020-02-12,2020-10-10&ordering=released&page=2&page_size=40&platforms=7,18,1"
//       // "https://api.rawg.io/api/games"
//     )
//       .then(res => res.json())
//       .then(results => {
//         // console.log(results);
//         this.setState({ result: results.results, fetchUrl: results.next });
//       });
//   };

//   render() {
//     console.log(this.state.result);
//     // console.log(this.state.pagenum);
//     // console.log(this.state.fetchUrl)
//     const gameImg = this.state.result.map(img => (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           margin: "auto",
//           padding: 2,
//           height: "400px"
//         }}
//       >
//         <img
//           onClick={this.handlesubmit}
//           // value={img.clip.video}
//           name={img.id}
//           style={{ width: 600, height: "50%", position: "absolute" }}
//           key={img.id}
//           src={img.background_image}
//           alt="img not avalable"
//         />
//         <div
//           style={{
//             position: "relative",
//             fontSize: 50,
//             textAlign: "center",
//             opacity: 0.7,
//             width: 600,
//             height: "20%",
//             top: "80%",
//             color: "white",
//             backgroundColor: "black"
//           }}
//         >
//           {img.name}
//         </div>
//       </div>
//     ));

//     const opts = {
//       height: "390",
//       width: "50%",
//       playerVars: {
//         // https://developers.google.com/youtube/player_parameters
//         autoplay: 0
//       }
//     };
//     // const display =
//     //     this.state.click === false ? <div>{gameImg}</div>   : <YouTube
//     //         videoId={this.state.videoId}
//     //         opts={opts}
//     //         onReady={this._onReady}
//     //     />

//     return (
//       <div>
//         <button onClick={this.nextPage}>next Page</button>
//         {this.state.click === false ? (
//           <div>{gameImg}</div>
//         ) : (
//           <div>
//             <button style={{ fontSize: 40 }} onClick={this.handlesubmit}>
//               x
//             </button>
//             <YouTube
//               videoId={this.state.videoId}
//               opts={opts}
//               onReady={this._onReady}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
//   _onReady(event) {
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();
//   }
// }

// export default App;
