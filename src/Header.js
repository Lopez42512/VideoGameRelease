import React from "react";

function Header(props) {
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
      <div className="burgercontainer">
        <button onClick={props.handleClick}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
