import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "../logo.png";
import {Button} from 'antd';
import testComments from "../TestData/testComments.json";
import { Card } from 'antd';
import {useSpring, animated, config} from 'react-spring';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });




export default ({ drizzle, drizzleState, position }) => {
  // destructure drizzle and drizzleState from props
  const [dataKey, setDataKey] = useState('');
  const [winnerInfos, setWinnerInfos] = useState({
    winner:"...loading",
    comment:"....loading",
    time:"......loading"
  });
  const [gotData, setGotData] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(()=>{
    const contract = drizzle.contracts.Raffle;
    const dk = contract.methods.countToRInfos.cacheCall(position);
    console.log(dataKey);
    setDataKey(dk)

  },[])


const style = useSpring({
  scale: isOver ? 1.1 : 0.9
})

const enter = ()=>{
  setIsOver(true);
}

const leave = ()=>{
  setIsOver(false);
}

const loadCard = ()=>{

  let infos = drizzleState.contracts.Raffle.countToRInfos[dataKey];

  if(!infos)return(
    <Card loading = {true} title = {position.toString()} style={{ width: 300}}className = "child">
      <p> ID = ....</p>
      <p> Winner = ......</p>
      <p> Winner comment ...........</p>
      <p> Time ..........</p>
      <p> Participants = .........</p>
    </Card>
  )

  /*
  id: "https://www.youtube.com/watch?v=GH5j7uT12jY"
  ipfs_hash: "QmYa1BEC4iV1z3yDxmiNXVXEjWzNWaU9CJFUy5MUNZqeZ5"
  name: "Initial_test"
  part_count: "79"
  winner: "58"
  */

  if(!gotData){
    ipfs.catJSON(infos.value.ipfs_hash, (err, result) => {
    console.log(err, result);
    if(!err){
      setWinnerInfos({
        winner:result.comments[parseInt(infos.value.winner)].user,
        comment:result.comments[parseInt(infos.value.winner)].comment,
        time:result.comments[parseInt(infos.value.winner)].time
      });
    }else{
      setWinnerInfos({
        winner:testComments.comments[parseInt(infos.value.winner)].user,
        comment:testComments.comments[parseInt(infos.value.winner)].comment,
        time:testComments.comments[parseInt(infos.value.winner)].time
      });
    }
    });
    setGotData(true);
  }

  return(
      <animated.div style = {style} >
        <Card  title = {infos.value.name} style={{ width: 450}}className = "child" onMouseOver = {enter} onMouseOut = {leave} >
          <p> ID = {infos.value.id}</p>
          <p> Winner = {winnerInfos.winner}</p>
          <p> Winner comment = {winnerInfos.comment}</p>
          <p> Time = {winnerInfos.time}</p>
          <p> Participants = {infos.value.part_count}</p>
        </Card>
    </animated.div>

  );



}



  return (
      <div>
        {loadCard()}
      </div>
  );
};
