import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

export default function Header(props) {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <header className="header">
      <div className="headerContainer">
        <button className="burgercontainer" onClick={handleClick}>
          VideoGames
        </button>
        <input type="text" className="searchBar" placeholder="Search Games"></input>
      </div>
    </header>
  );
}
