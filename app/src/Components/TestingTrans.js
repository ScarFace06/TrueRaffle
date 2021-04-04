import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import {Button, Input,  } from 'antd';
import Rafflecards from './Rafflecards'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  const [stackID, setStackID] = useState('');
  const [id, setId] = useState('')
  const [seed, setSeed] = useState('')
  const [participants, setParticipants] = useState('')


  const changeID = (e) =>{
    setId(e.target.value)
  }
  const changeSeed = (e) =>{
    setSeed(e.target.value);
  }
  const changePa = (e) =>{
    setParticipants(e.target.value);
  }

  const check = (value) =>{
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      return true;
    }else{
      return false;
    }
  }

  const setValue =()=>{
    // const get Contract
    const contract = drizzle.contracts.Raffle;
    //myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])

    const stack_id = contract.methods.getWinner.cacheSend(seed,id,participants,{
        from: drizzleState.accounts[0]
    });

    setStackID(stack_id);

  }

  const getTxStatus = () =>{
    // get the transaction states from the drizzle state
   const { transactions, transactionStack } = drizzleState;

   // get the transaction hash using our saved `stackId`
   const txHash = transactionStack[stackID];

   // if transaction hash does not exist, don't display anything
   if (!txHash) return null;

   // otherwise, return the transaction status
   if (transactions[txHash] && transactions[txHash].status === 'success'){
     console.log(transactions[txHash].receipt.events.requestedRaffle.returnValues.requestID);
   }
   return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;

  };




  return (
      <div style = {{textAlign: "center"}}>
        <h2>Testing Transactions</h2>
        <Input onChange = {changeID} placeholder ='ID'/>
        <Input onChange = {changeSeed} placeholder ='seed'/>
        <Input onChange = {changePa} placeholder ='participants'/>
        <Button onClick = {setValue}>get Winner</Button>
        <div>{getTxStatus()}</div>
      </div>
  );
};
