import React, {useState} from "react";
import Home from './Home';
import {BrowserRouter as Router , Switch , Route , Link, useLocation} from "react-router-dom";
import {Button, Result} from 'antd';
import YoutubeRaffle from "./YoutubeRaffle";
import InstagramRaffle from "./InstagramRaffle";
import WinnerComp from "./WinnerComp";
import YoutubeRaffleTesting from "./YoutubeRaffleTesting";
import Details from "./Details";
import {useTransition, animated} from 'react-spring';
import Swap from './Swap';
import CreateGiveAway from "./CreateGiveAway";
import GiveAways from "./GiveAways";
import GiveAwayDetails from "./GiveAwayDetails";



export default ({drizzle, drizzleState}) =>{


    return(
            <div>
              <Switch>
                <Route path = "/" exact component = {Home}/>
                <Route path = "/Youtube" exact children = {<YoutubeRaffle drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/Instagram" exact children = {<InstagramRaffle/>}/>
                <Route path = "/winners" exact children = {<WinnerComp drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/Testing" exact children = {<YoutubeRaffleTesting drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/GetTRC" exact children = {<Swap drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/createGiveAway" exact children = {<CreateGiveAway drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/winners/:id" children = {<Details drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/Giveaway/:id" children = {<GiveAwayDetails drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                <Route path = "/GiveAways" children = {<GiveAways drizzle = {drizzle} drizzleState = {drizzleState}/>}/>
                
                

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
