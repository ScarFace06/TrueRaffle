import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { Drawer, Button } from 'antd';
import { MenuUnfoldOutlined, UserOutlined  } from '@ant-design/icons';
import {useTransition, animated, useSpring, config} from "react-spring";
import Icon from './Icon';
import NavButtons from './NavButtons';
import EthLogo from './EthLogo';
import LinkLogo from './LinkLogo';
import TRCLogo from './TRCLogo';





export default ({drizzle, drizzleState}) =>{

  const [visible, setVisible] = useState(false);
  const [open, SetOpen] = useState(false);
  const [dataKey, setDataKey] = useState("");
  const [trc_value, setTRcValue] = useState("0");

  useEffect(()=>{
    // console.log(drizzle);
    // console.log(drizzleState);
    const contract = drizzle.contracts.LinkTokenInterface;
    const dk = contract.methods.balanceOf.cacheCall(drizzleState.accounts[0]);
    setDataKey(dk);
  },[drizzleState]);

  const expand = useSpring({
    float:"right",
    height: open ? "15em":"4.5em",
    overflow:"hidden",
    config: config.wobbly
  })
  const spin = useSpring({
    transform: open ? "rotate(180deg)" : "rotate(0deg)"
  })

  const entry = useSpring({
    from:{opacity:0, transform: 'translate3d(0,-100%,0)'}, 
    to:{opacity:1, transform: 'translate3d(0,0%,0)'},
    config:config.wobely
});

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
      if(value === "0")return 0;
      let t = value.length;
      for(var i = 0; i<18;i++){
        t--;
      }
      var res = value.slice(0,t);
      res += ".";
      res += value.slice(t,t+3);
      return res;
    };

const linkBalance = () =>{
  let info = drizzleState.contracts.LinkTokenInterface.balanceOf[dataKey];

  if(!info)return (<p>loading..</p>);

  let val = convertCur(info.value)

  return (<p>{<LinkLogo/>} {val}</p>);

}

const TRCBalance = () =>{
  
  const contract = drizzle.contracts.TrueRaffleCoin;
  contract.methods.balanceOf(drizzleState.accounts[0]).call({from: drizzleState.accounts[0]})
  .then(res=>{
    setTRcValue(convertCur(res));
  });

  

  return (<p>{<TRCLogo width = "15" heigth = "15"/>} {trc_value}</p>);

}




    return(
      <animated.div style = {entry}>
        
          <div className = "headerButtons">
          
            <Button type="text" onClick={showDrawer} icon = {<MenuUnfoldOutlined style = {{color:"rgb(241, 255, 255)"}}/>}   style = {{float: 'left'}}  size = 'large'/>
              <animated.div style = {expand}  >
                <Button style = {{float: 'right', paddingbottom: "15px"}} icon = {<animated.div style = {spin}><UserOutlined style = {{color:"rgb(241, 255, 255)"}} /></animated.div>}  type = "text"  size = 'large' onClick = {clicked}/>
                <p>{drizzleState.accounts[0]}</p>
                <p>{<EthLogo/>} {convertCur(drizzleState.accountBalances[drizzleState.accounts[0]])}</p>
                <p>{linkBalance()}</p>
                <p>{TRCBalance()}</p>
              </animated.div>
              <div className = "logo"><Icon/></div>
          </div>
          
            <Drawer
              title="Navigation"
              placement="left"
              closable={true}
              onClose={onClose}
              visible={visible}
              maskStyle = {{backround:"#878787"}}
              
            >
              
              <NavButtons link = "/" name ='Home' onClose = {onClose} />
              <NavButtons link = '/Youtube' name ='Youtube' onClose = {onClose} />
              <NavButtons link = '/winners' name ='See all Winners' onClose = {onClose} />
              <NavButtons link = "/GetTRC" name = 'Get TrueRaffleCoin' onClose = {onClose}/>
              
            </Drawer>
          
      </animated.div>

    );



};


/**/
