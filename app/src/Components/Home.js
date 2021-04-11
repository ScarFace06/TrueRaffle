import React from "react";
import { Button } from 'antd';
import {useSpring, animated, config} from 'react-spring';


function Home(probs) {

    const entry = useSpring({
        from:{opacity:0, transform: 'translate3d(-100%,0,0)'},
        to:{opacity:1, transform: 'translate3d(0%,0,0)'},
        config:config.wobely
      });

    return (


        <animated.div style= {entry} >
            <div className="divs">
            <h1 style = {{textAlign: "center"}}>Home</h1>

            <Button type = "default" className="Homebtn"  onClick = {()=>{
                probs.history.push("/Youtube");
            }}>Youtube Raffle</Button>
            <br/>
            <Button type = "default" className="Homebtn"  onClick = {() =>{
                probs.history.push("/winners");
            }}>All Winners</Button>
            <br/>
            <Button type = "default" className="Homebtn" onClick = {() => {
                probs.history.push("/GetTRC");
            }}>Get TrueRaffleCoins</Button>
            </div>

            <div className = "divs">
                <h2 style = {{textAlign: "center"}}>How to use TrueRaffle?</h2>
                <br/>
                <h5 style = {{textAlign: "center"}}>1. Swap Chainlink to TrueRaffleCoin (1 TRC = 0.1 Link) </h5>
                <br/>
                <h5 style = {{textAlign: "center"}}>2. Enter a Name for the Raffle, choose a seed, paste a yt-link, optional: filter for Hashtags and start the Raffle with 1 TRC</h5>
                <br/>
                <h5 style = {{textAlign: "center"}}>3. Approve in Metamask and wait</h5>
                <br/>
                <h5 style = {{textAlign: "center"}}>4. ???</h5>
                <br/>
                <h5 style = {{textAlign: "center"}}>5. Profit</h5>
                <br/>
                <br/>
            </div>
            <br/>
            <br/>
        </animated.div>




    );
}

export default Home;
