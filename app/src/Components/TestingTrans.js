import React, {useEffect, useState} from "react";
import {Button, Input,  } from 'antd';
import Rafflecards from './Rafflecards'
import testComments from "../TestData/testComments.json"
import RaffleRequestCard from "./RaffleRequestCard";
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  const [raffle_stackID, setRStackID] = useState('');
  const [link_stackID, setLStackID] = useState('');
  const [name, setName] = useState('')
  const [seed, setSeed] = useState('')
  const [dataKey, setDataKey] = useState('');

  useEffect(()=>{
    const contract = drizzle.contracts.LinkTokenInterface;
    // console.log(drizzle)
    const dk = contract.methods.balanceOf.cacheCall(drizzleState.accounts[0]);
    setDataKey(dk);
  },[drizzleState]);

  const changeName = (e) =>{
    setName(e.target.value)
  }
  const changeSeed = (e) =>{
    setSeed(e.target.value);
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
    // catch edge cases
    if(name === "")alert("You must choose a Name");
    else if(seed === "" || !check(seed))alert("You must choose a seed");
    else{


      // const get Contract
      const contract = drizzle.contracts.Raffle;
      //myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])
      const stack_id = "";

      testComments['name'] = name;
      testComments['choosenSeed'] = seed;
      let id = testComments.Link;
      let participants = testComments.comments.length;

      ipfs.addJSON(testComments, (err, result) => {
        console.log(err, result);
        const stack_id = contract.methods.getWinner.cacheSend(seed,id,participants,name,result,{
            from: drizzleState.accounts[0]
        });
        setLStackID("");
        setRStackID(stack_id);
      });





    }

  }

  const getTxStatus = () =>{
    // get the transaction states from the drizzle state
   const { transactions, transactionStack } = drizzleState;

   // get the transaction hash using our saved `stackId`
   const txHash = transactionStack[raffle_stackID];

   // if transaction hash does not exist, don't display anything
   if (!txHash) return null;

   // otherwise, return the transaction status
   if (transactions[txHash] && transactions[txHash].status === 'success'){
     let req = transactions[txHash].receipt.events.requestedRaffle.returnValues.requestID
     console.log(req);
     return(
       <RaffleRequestCard drizzle = {drizzle} drizzleState = {drizzleState} requestId = {req}/>
     )
   }
   return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;

  };

  const sendLink = ()=>{
    // TODO it works but need to be saperate function for the txhashes
    const contract = drizzle.contracts.LinkTokenInterface;
    const stack_id = contract.methods.transfer.cacheSend(drizzle.contracts.Raffle.address,'100000000000000000',{
        from: drizzleState.accounts[0]
    });
    setLStackID(stack_id);
  }

  const getLinkBalance =()=>{
    // TODO make it beautiful
    let infos = drizzleState.contracts.LinkTokenInterface.balanceOf[dataKey];

    if(!infos)return null;
    var balance = infos.value.slice(0,3)
    balance += ","
    balance += infos.value.slice(3,5);
    return (
      <div>
        <p> your Link balance is {balance}</p>
      </div>
    );
  }

  const linkTransfered =()=>{
    // get the transaction states from the drizzle state
   const { transactions, transactionStack } = drizzleState;

   // get the transaction hash using our saved `stackId`
   const txHash = transactionStack[link_stackID];

   if(!txHash)return (<p>Please transfere some link to start the Raffle</p>);


   if (transactions[txHash] && transactions[txHash].status === 'success'){

     return (
       <Button onClick = {setValue}>get Winner</Button>
     );
   }

   return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;

  }



  return (
      <div style = {{textAlign: "center"}}>
        <h2>Testing Transactions</h2>
        <div>{getLinkBalance()}</div>
        <Input onChange = {changeName} placeholder ='Name'/>
        <Input onChange = {changeSeed} placeholder ='seed'/>
        <div>
          <p>____________________________</p>
          <p></p>
          <p>Here would be the YT stuff</p>
          <p></p>
          <p>____________________________</p>
        </div>
        <Button onClick = {sendLink}>Send Link</Button>
        <div>{linkTransfered()}</div>
        <div>{getTxStatus()}</div>
      </div>
  );
};
