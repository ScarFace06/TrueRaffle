import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "../logo.png";
import {Button} from 'antd';
import { Card } from 'antd';



export default ({ drizzle, drizzleState, position }) => {
  // destructure drizzle and drizzleState from props
  const [dataKey, setDataKey] = useState('');

  useEffect(()=>{
    const contract = drizzle.contracts.Raffle;
    const dk = contract.methods.countToRInfos.cacheCall(position);
    console.log(dataKey);
    setDataKey(dk)

  },[])



let infos = drizzleState.contracts.Raffle.countToRInfos[dataKey];



  return (
      <div>
        <Card loading = {!infos} title = {position.toString()} style={{ width: 300}}className = "child">
          <p> ID = {infos && infos.value['id']}</p>
          <p> Winner = {infos && infos.value['winner']}</p>
          <p> Participants = {infos && infos.value['part_count']}</p>
        </Card>
      </div>
  );
};
