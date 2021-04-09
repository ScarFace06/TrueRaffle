import React, {useEffect, useState} from 'react';
import {useTransition, animated, useSpring, config} from "react-spring";
import {Button, Input, InputNumber, notification } from 'antd';
import LoadingLogo from './LoadingLogo';


export default ({drizzle , drizzleState}) =>{

const [stackID, setStackID] = useState("");
const [amount, setAmount] = useState(1);

const openNotification = () => {
  notification.open({
    message: 'Transaction successful',
    description:
      'You got your TRC congrats please reload the side we have problems rendering the balance',
    onClick: () => {
      console.log('Notification Clicked!');
    },
    icon: <LoadingLogo width = "20" height = "20"/>
  });
};


  const getTRC = ()=>{

      const toSend = amount.toString()+"00000000000000000";
    drizzle.contracts.LinkTokenInterface.methods
      .approve(drizzle.contracts.Raffle.address, toSend)
      .send({ from: drizzleState.accounts[0] })
      .on("transactionHash", (hash) => {
        const stack_id = drizzle.contracts.Raffle.methods.swap.cacheSend(amount,{
            from: drizzleState.accounts[0]
        });
        setStackID(stack_id);
      })
    };


  const getTxStatus = ()=>{
    // get the transaction states from the drizzle state
   const { transactions, transactionStack } = drizzleState;

   // get the transaction hash using our saved `stackId`
   const txHash = transactionStack[stackID];

   // if transaction hash does not exist, don't display anything
   if (!txHash) return null;

   // otherwise, return the transaction status
   if (transactions[txHash] && transactions[txHash].status === 'success'){
     setStackID("");
     openNotification();
   }
   return (<LoadingLogo width = "150" height ="150"/>);
  }

  const onChange = (value)=>{
    setAmount(value);
  }

  return(
    <div  style = {{textAlign: "center"}}>
      <h1>Get Your TrueRaffleCoin´s </h1>
      <p>Amount</p>
      <InputNumber min={1} max={100} defaultValue={1} onChange={onChange}/>
      <Button type = "primary" onClick = {getTRC}>swap</Button>
      <p>{getTxStatus()}</p>
    </div>
  );


};
