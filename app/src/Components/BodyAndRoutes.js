import React, {useState} from "react";
import Home from './Home';
import {BrowserRouter as Router , Switch , Route , Link, useLocation} from "react-router-dom";
import {Button, Result, Spin } from 'antd';
import YoutubeRaffle from "./YoutubeRaffle";
import InstagramRaffle from "./InstagramRaffle";
import WinnerComp from "./WinnerComp";
import TestingTrans from "./TestingTrans";
import {useTransition, animated} from 'react-spring';
import Swap from './Swap';



export default ({drizzle, drizzleState}) =>{

  // const loca = useLocation();
  //
  //
  // const transitions = useTransition(loca, loca => loca.pathname, {
  //     from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  //     enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  //     leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  //   })

    return(
            <div>
              <Switch>
                <Route path = "/" exact component = {Home}/>
                <Route path = "/Youtube" exact children = {<YoutubeRaffle/>}/>
                <Route path = "/Instagram" exact children = {<InstagramRaffle/>}/>
                <Route path = "/winners" exact children = {<WinnerComp drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/Testing" exact children = {<TestingTrans drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/GetTRC" exact children = {<Swap drizzle = {drizzle} drizzleState = {drizzleState}/>}/>

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
          );


};
