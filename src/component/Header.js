import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

export default function Header(props) {
  let history = useHistory();
  function handleClick () {
    history.push("/")
  }
  return (
    <header className="header">
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          opacity: ".8",
          position: "absolute",
          zIndex: "-1"
        }}
      ></div>
      <Switch>
        <Route exact path="/">
          <div style={{width: 320}} className="burgercontainer">
            <button onClick={props.handleClick}>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
            </button>
          </div>
        </Route>
        <Route path="/game">
            <button className="burgercontainer" onClick={handleClick}>
              Go Back
            </button>
        </Route>
      </Switch>
    </header>
  );
}

