import React, {useState} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import {BrowserRouter as Router , Switch , Route , Link, useLocation} from "react-router-dom";

import HeadAndNav from "./Components/HeadAndNav";
import BodyAndRoutes from './Components/BodyAndRoutes';
import LoadingLogo from './Components/LoadingLogo';

const drizzle = new Drizzle(drizzleOptions);


const App = () => {



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
                              </div>
                        </Router>


              )
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>





  );
}

export default App;
