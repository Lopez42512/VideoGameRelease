import React from "react";
// import YouTube from "react-youtube";
import Header from "./component/Header";
import Main from "./component/Main"
import GamePage from "./component/GamePage"
import {Switch, Route} from "react-router-dom"

function App () {
  return(
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/game/:gameId" >
          <GamePage />
        </Route>
      </Switch>
    </div>
    
  )
}

export default App