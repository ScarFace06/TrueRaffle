import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "../logo.png";
import {Button} from 'antd';
import { Card } from 'antd';
import LoadingLogo from './LoadingLogo';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });




export default ({ drizzle, drizzleState, requestId }) => {
  // destructure drizzle and drizzleState from props
  const [dataKey, setDataKey] = useState('');
  const [winnerInfos, setWinnerInfos] = useState({
    winner:"...loading",
    comment:"....loading",
    time:"......loading"
  });
  const [gotData, setGotData] = useState(false);


  useEffect(()=>{
    const contract = drizzle.contracts.Raffle;
    const dk = contract.methods.requestIDtoRInfos.cacheCall(requestId);
    //console.log(dataKey);
    setDataKey(dk)

},[drizzleState])






const loadCard = ()=>{

  let infos = drizzleState.contracts.Raffle.requestIDtoRInfos[dataKey];

  if(!infos)return(
    <Card loading = {true} title = {requestId} style={{ width: 300}}className = "child">
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
  let parts = parseInt(infos.value.part_count);
  let wi = parseInt(infos.value.winner)
  console.log(wi);
  if(!gotData && parts>wi){
    ipfs.catJSON(infos.value.ipfs_hash, (err, result) => {
    console.log(err, result);
    setWinnerInfos({
      winner:result.comments[parseInt(infos.value.winner)].user,
      comment:result.comments[parseInt(infos.value.winner)].comment,
      time:result.comments[parseInt(infos.value.winner)].time
    });

    });
    setGotData(true);
  }

  return(

      <Card  title = {infos.value.name} style={{ width: 300}}className = "child">
        <p> ID = {infos.value.id}</p>
        <p> Winner = {winnerInfos.winner}</p>
        <p> Winner comment = {winnerInfos.comment}</p>
        <p> Time = {winnerInfos.time}</p>
        <p> Participants = {infos.value.part_count}</p>
      </Card>


  );



}



  return (
      <div>
        {loadCard()}
      </div>
  );
};
