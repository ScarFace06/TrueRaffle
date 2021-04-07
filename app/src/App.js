import React, {useState} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./Components/MyComponent";
import Home from './Components/Home';
import "./App.css";
import {BrowserRouter as Router , Switch , Route , Link} from "react-router-dom";
import {Button, Result, Spin } from 'antd';
import { newContextComponents } from "@drizzle/react-components";
import YoutubeRaffle from "./Components/YoutubeRaffle";
import InstagramRaffle from "./Components/InstagramRaffle";
import WinnerComp from "./Components/WinnerComp";
import TestingTrans from "./Components/TestingTrans";
import HeadAndNav from "./Components/HeadAndNav";


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
                                  

                                  <Switch>
                                    <Route path = "/" exact component = {Home}/>
                                    <Route path = "/Test" exact children = { <MyComponent drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                                    <Route path = "/Youtube" exact children = {<YoutubeRaffle/>}/>
                                    <Route path = "/Instagram" exact children = {<InstagramRaffle/>}/>
                                    <Route path = "/winners" exact children = {<WinnerComp drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                                    <Route path = "/Testing" exact children = {<TestingTrans drizzle = {drizzle} drizzleState = {drizzleState}/>}/>


                                    <Route component = {()=>{
                                        return(
                                          <Result
                                              status="404"
                                              title="404"
                                              subTitle="Sorry, the page you visited does not exist."
                                              extra={<Button type="primary"><Link to = "/">Back Home</Link></Button>}
                                            />
                                        )
                                      }}/>
                                  </Switch>
                              </div>

                        </Router>


              )
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>





  );
}

export default App;
