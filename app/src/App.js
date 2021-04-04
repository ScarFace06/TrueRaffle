import React, {useState} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./Components/MyComponent";
import Home from './Components/Home';
import "./App.css";
import {BrowserRouter as Router , Switch , Route , Link} from "react-router-dom";
import { Drawer, Button, Result, Spin } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { newContextComponents } from "@drizzle/react-components";
import YoutubeRaffle from "./Components/YoutubeRaffle";
import InstagramRaffle from "./Components/InstagramRaffle";
import WinnerComp from "./Components/WinnerComp";
import TestingTrans from "./Components/TestingTrans";

const drizzle = new Drizzle(drizzleOptions);
const { AccountData, ContractData, ContractForm } = newContextComponents;

const App = () => {

  const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };

    const onClose = () => {
      setVisible(false);
    };


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
                                <h1 style = {{textAlign: "center"}}>True Raffle</h1>
                                <Button type="primary" onClick={showDrawer} icon = {<MenuUnfoldOutlined />}/>
                              <Drawer
                                title="Navigation"
                                placement="left"
                                closable={true}
                                onClose={onClose}
                                visible={visible}
                              >
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/'>Home</Link></Button></p>
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/Test'>Test</Link></Button></p>
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/Youtube'>Youtube</Link></Button></p>
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/Instagram'>Instagram</Link></Button></p>
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/winners'>See All Winners</Link></Button></p>
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/Testing'>Testing</Link></Button></p>
                                <p><Button type ="link" onClick = {onClose} ><Link to = '/twitter'>test 404</Link></Button></p>
                              </Drawer>
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
                                  <div className="section">
                                    <h2>Active Account</h2>
                                    <AccountData
                                      drizzle={drizzle}
                                      drizzleState={drizzleState}
                                      accountIndex={0}
                                      units="ether"
                                      precision={3}
                                    />
                                  </div>

                              </div>

                        </Router>


              )
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>





  );
}

export default App;
