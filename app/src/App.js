import React, {useState} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./Components/MyComponent";
import Home from './Components/Home';
import "./App.css";
import {BrowserRouter as Router , Switch , Route , Link, useLocation} from "react-router-dom";
import {Button, Result, Spin } from 'antd';
import { newContextComponents } from "@drizzle/react-components";
import YoutubeRaffle from "./Components/YoutubeRaffle";
import InstagramRaffle from "./Components/InstagramRaffle";
import WinnerComp from "./Components/WinnerComp";
import TestingTrans from "./Components/TestingTrans";
import HeadAndNav from "./Components/HeadAndNav";
import {useTransition, animated} from 'react-spring';
import BodyAndRoutes from './Components/BodyAndRoutes';

const drizzle = new Drizzle(drizzleOptions);
const { AccountData, ContractData, ContractForm } = newContextComponents;

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
                      <div style = {{textAlign: "center"}}><Spin size="large"  /></div>
                  </div>
                )
              }

              return (
                        <Router>
                              <div>
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
