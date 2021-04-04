import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import {Button} from 'antd';
import Rafflecards from './Rafflecards'

const { AccountData, ContractData, ContractForm } = newContextComponents;

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



let count = drizzleState.contracts.Raffle.counter[dataKey];

 const getCards = (v)=>{
   let res = []
   for(var i = 0; i<v; i++){
     res.push(<Rafflecards drizzle = {drizzle} drizzleState = {drizzleState} position = {i}/>)
   }
   return res;
 }


  return (
      <div style = {{textAlign: "center"}}>
        <h2>Raffle Winners</h2>
        <div>{count && getCards(parseInt(count.value))}</div>
      </div>
  );
};
