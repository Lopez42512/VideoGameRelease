import React, {Component} from "react"
import YouTube from "react-youtube"
// npm install react-youtube
 
class App extends Component {
    constructor() {
        super()
        this.state = {
            number: 1,
            color: "blue",
            result: [],
            videoId: "",
            click: false
        }
    }
 
    handlesubmit = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        console.log(value)
        // name === "hello" ? this.setState({ number: 0 }) : this.setState({ number: 1, color: "green" })
        console.log(name)
        this.setState({ videoId: name, click: !this.state.click })
    }
 
    componentDidMount() {
        fetch("https://api.rawg.io/api/games?dates=2018-10-10,2020-10-10&ordering=-added")
            .then(res => res.json())
            .then((results) => {
                this.setState({ result: results.results })
            })
    }
 
    render() {
        console.log(this.state.result)
        console.log(this.state.click)
        const gameImg = this.state.result.map((img) => <img onClick={this.handlesubmit} value={img.clip.video} name={img.clip.video} style={{ width: "100%", height: 400 }} key={img.id} src={img.background_image} alt="img not avalable" />)
        const opts = {
            height: '390',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        // const display = 
        //     this.state.click === false ? <div>{gameImg}</div>   : <YouTube
        //         videoId={this.state.videoId}
        //         opts={opts}
        //         onReady={this._onReady}
        //     />
        
        return (
            <div>
                {this.state.click === false ? gameImg   : <div><div onClick={this.handlesubmit}>x</div><YouTube
                videoId={this.state.videoId}
                opts={opts}
                onReady={this._onReady}
            /></div>}
 
            </div>
        )
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}

export default App