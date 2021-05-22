import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import {Button, BackTop} from 'antd';
import Rafflecards from './Rafflecards'
import {useSpring, animated, config} from 'react-spring';


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  const [dataKey, setDataKey] = useState('');

  useEffect(()=>{
    const contract = drizzle.contracts.Raffle;
    //console.log(drizzleState)
    const dk = contract.methods.counter.cacheCall();
    //console.log(dataKey);
    setDataKey(dk)
    // ok the data cant be getted on load cuz drizzleState takes a while

  },[drizzleState])

  const entry = useSpring({
    from:{opacity:0, transform: 'translate3d(-100%,0,0)'},
    to:{opacity:1, transform: 'translate3d(0%,0,0)'},
    config:config.wobely
});

let count = drizzleState.contracts.Raffle.counter[dataKey];

 const getCards = (v)=>{
   let res = []
   for(var i = 0; i<v; i++){
     res.push(<Rafflecards drizzle = {drizzle} drizzleState = {drizzleState} position = {i}/>)
   }
   return res;
 }


  return (
      <animated.div style= {entry} className="divs">
        <BackTop />
        <h2>Raffle Winners</h2>
        <br/>
        <Button className = "btn" type = "default" href = {"https://kovan.etherscan.io/address/"+drizzle.contracts.Raffle.address}> View Contract on Etherscan</Button>
        <br/>
        <div>{count && getCards(parseInt(count.value))}</div>
      </animated.div>
  );
};
