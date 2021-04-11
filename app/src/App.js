import React, {useState} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import {BrowserRouter as Router , Switch , Route , Link, useLocation} from "react-router-dom";
import chainlinkfooter from "./chainlinkfooter.png";
import HeadAndNav from "./Components/HeadAndNav";
import BodyAndRoutes from './Components/BodyAndRoutes';
import LoadingLogo from './Components/LoadingLogo';
import {useSpring, animated,config} from 'react-spring';

const drizzle = new Drizzle(drizzleOptions);


const App = () => {

    const entry = useSpring({
      from:{opacity:0, transform: 'translate3d(0,+100%,0)'},
      to:{opacity:1, transform: 'translate3d(0,0%,0)'},
      config:config.wobely
    });

  return (


    <DrizzleContext.Provider drizzle={drizzle}>
          <DrizzleContext.Consumer>
            {drizzleContext => {
              const { drizzle, drizzleState, initialized } = drizzleContext;

              if (!initialized) {
                return (
                  <div>
                    <h3 style = {{textAlign: "center"}}>Please wait while we are Connecting to the Chain</h3>
                      <div style = {{textAlign: "center"}}><LoadingLogo width = "200" height = "200"  /></div>
                      <p style = {{textAlign: "center"}}>Please change to the Kovan Test Network and reload the page</p>
                  </div>
                )
              }

              return (
                        <Router>
                              <div className="unterroot">
                                  <HeadAndNav drizzle ={drizzle} drizzleState = {drizzleState} />
                                  <BodyAndRoutes drizzle ={drizzle} drizzleState = {drizzleState} />
                                  <animated.div style = {{textAlign: "center", ...entry}}><img src = {chainlinkfooter} style = {{textAlign : "center", width :"6rem"}}/></animated.div>
                              </div>
                        </Router>


              )
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>





  );
}

export default App;
