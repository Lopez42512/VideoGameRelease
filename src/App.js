import React from "react";
// import YouTube from "react-youtube";
import Header from "./component/Header";
import Main from "./component/Main";
import GamePage from "./component/GamePage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className="sideBarContainer">{/* <Sidebar /> */}</div>
        <div className="infoContainer">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/game/:gameId">
              <GamePage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
