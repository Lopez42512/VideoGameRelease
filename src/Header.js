import React from "react"

function Header(props){
    return(
        <header className="header">
            <div style={{backgroundColor: "black", width: "100%", height:"100%", opacity:".8", position:"absolute", zIndex:"-1"}}></div>
            <button onClick={props.handleClick}>press me</button>
        </header>
    )
}

export default Header