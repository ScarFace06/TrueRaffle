import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router , Switch , Route , Link} from "react-router-dom";
import YoutubeRaffle from './Components/YoutubeRaffle';
import Home from './Components/Home';
import TwitterRaffle from './Components/TwitterRaffle';
import InstagramRaffle from './Components/InstagramRaffle';
import GiveAway from './Components/GiveAway';
import { Drawer, Button } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';


 const App = () => {

    
    const [visible, setVisible] = useState(false);
  
    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
  
  return (
    <Router>
      <div>
        <h1 style = {{textAlign: "center"}}>True Raffle</h1>
        <Button type="primary" onClick={showDrawer} icon = {<MenuUnfoldOutlined />}/>
      <Drawer
        title="Navigation"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p><Link to = '/'>Home</Link></p>
        <p><Link to = '/Youtube'>YouTube</Link></p>
        <p><Link to = '/Twitter'>Twitter</Link></p>
        <p><Link to = '/Instagram'>Instagram</Link></p>
        <p><Link to = '/giveaway'>GiveAway</Link></p>
      </Drawer>
          <Switch>
            <Route path = "/" exact component = {Home}/>
            <Route path = "/YouTube" exact component = {YoutubeRaffle}/>
            <Route path = "/Twitter" exact component = {TwitterRaffle}/>
            <Route path = "/Instagram" exact component = {InstagramRaffle}/>
            <Route path = "/giveaway" exact component = {GiveAway}/>
          </Switch>
      </div>
      
    </Router>
  );
};

export default App;
