import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { Drawer, Button } from 'antd';
import { MenuUnfoldOutlined, UserOutlined  } from '@ant-design/icons';
import {useTransition, animated, useSpring, config} from "react-spring";
import Icon from './Icon';
import NavButtons from './NavButtons';
import EthLogo from './EthLogo';
import LinkLogo from './LinkLogo';





export default ({drizzle, drizzleState}) =>{

  const [visible, setVisible] = useState(false);
  const [open, SetOpen] = useState(false);
  const [dataKey, setDataKey] = useState("");

  useEffect(()=>{

    console.log(drizzleState);
    const contract = drizzle.contracts.LinkTokenInterface;
    const dk = contract.methods.balanceOf.cacheCall(drizzleState.accounts[0]);
    setDataKey(dk);
  },[]);

  const expand = useSpring({
    float:"right",
    height: open ? "200px":"70px",
    overflow:"hidden",
    config: config.wobbly
  })
  const spin = useSpring({
    transform: open ? "rotate(180deg)" : "rotate(0deg)"
  })

  const clicked = ()=>{
    SetOpen(!open);
  }

    const showDrawer = () => {
      setVisible(true);
    };

    const onClose = () => {
      setVisible(false);
    };

    const convertCur = (value)=>{
      let t = value.length;
      for(var i = 0; i<18;i++){
        t--;
      }
      var res = value.slice(0,t);
      res += ".";
      res += value.slice(t,t+3);
      return res;
    };


let linkBalance = drizzleState.contracts.LinkTokenInterface.balanceOf[dataKey];

    return(
      <div>
          <div className = "headerButtons">
          <Button type="text" onClick={showDrawer} icon = {<MenuUnfoldOutlined/>}   style = {{float: 'left'}}  size = 'large'/>
          <div className = "logo"><Icon/></div>

            <animated.div style = {expand} >
              <Button style = {{float: 'right', paddingbottom: "15px"}} icon = {<animated.div style = {spin}><UserOutlined /></animated.div>}  type = "text"  size = 'large' onClick = {clicked}/>
              <p>{drizzleState.accounts[0]}</p>
              <p>{<EthLogo/>} {convertCur(drizzleState.accountBalances[drizzleState.accounts[0]])}</p>
              <p>{<LinkLogo/>} {linkBalance && convertCur(linkBalance.value)}</p>
            </animated.div>
          </div>
            <Drawer
              title="Navigation"
              placement="left"
              closable={true}
              onClose={onClose}
              visible={visible}
            >
              <NavButtons link = "/" name ='Home' onClose = {onClose} />
              <NavButtons link = '/Youtube' name ='Youtube' onClose = {onClose} />
              <NavButtons link = '/Instagram' name ='Instagram' onClose = {onClose} />
              <NavButtons link = '/winners' name ='See all Winners' onClose = {onClose} />
              <NavButtons link = '/Testing' name ='Testing' onClose = {onClose} />
              <NavButtons link = '/twitter' name ='404 Page' onClose = {onClose} />
          </Drawer>
      </div>

    );



};


/**/
