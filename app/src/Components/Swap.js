import React, {useEffect, useState} from 'react';
import {useTransition, animated, useSpring, config} from "react-spring";
import {Button, Input, InputNumber, notification } from 'antd';
import LoadingLogo from './LoadingLogo';
import TRCLogo from './TRCLogo';


export default ({drizzle , drizzleState}) =>{

const [stackID, setStackID] = useState("");
const [amount, setAmount] = useState(1);
const [loading, setLoading] = useState(false);

const openNotification = () => {
  notification.open({
    message: 'Transaction successful',
    description:
      'You got your TRC congrats',
    icon: <LoadingLogo width = "20" height = "20"/>
  });
};

const entry = useSpring({
  from:{opacity:0, transform: 'translate3d(-100%,0,0)'}, 
  to:{opacity:1, transform: 'translate3d(0%,0,0)'},
  config:config.wobely
});

  const getTRC = ()=>{
      setLoading(true);
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
     setLoading(false);
     openNotification();
   }
   return (
        <div>
        <p> Waiting for Transaction</p>
        <div className = "loader"><LoadingLogo width = "100" height = "100"  /></div>
        </div>
    );
  }

  const onChange = (value)=>{
    setAmount(value);
  }

  const price = ()=>{
      let res = amount /10;
      return "It will Cost "+res.toString()+" Link";
  }

  return(
    <animated.div  className = "divs" style = {entry} >
      <h1>{<TRCLogo width = "50" height = "50"/>}Get Your TrueRaffleCoin´s {<TRCLogo width = "50" height = "50"/>}</h1>
      <p>Amount</p>
      <InputNumber min={1} max={100} defaultValue={1} onChange={onChange} className = "in"/>
      <Button type = "default" onClick = {getTRC} disabled = {loading} className = "btn">swap</Button>
      <p>{price()}</p>
      <p>{getTxStatus()}</p>
    </animated.div>
  );


};
