import React, {useEffect, useState} from "react";
import {Button, Input, Space } from 'antd';
import Rafflecards from './Rafflecards'
import RaffleRequestCard from "./RaffleRequestCard";
import LoadingLogo from "./LoadingLogo";
import {get_comments, youtube_parser} from "../API/ytAPI";
import {useSpring, animated,config} from 'react-spring';
import {useSelector, useDispatch} from 'react-redux';
import {setComments} from '../redux/actions';
import { Checkbox } from 'antd';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  const [raffle_stackID, setRStackID] = useState('');
  const [name, setName] = useState('')
  const [seed, setSeed] = useState('')
  const [loading, setLoading] = useState(false);
  const [yt_link, setYTlink] = useState('');
  const [hashtag, setHashtag] = useState("");
  const [dup, setDuplicate] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>()=>{
        dispatch(setComments({init:false}));
    },[]);


    const entry = useSpring({
        from:{opacity:0, transform: 'translate3d(-100%,0,0)'},
        to:{opacity:1, transform: 'translate3d(0%,0,0)'},
        config:config.wobely
    });



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

  const setValue = async () =>{
    // catch edge cases
    if(name === "")alert("You must choose a Name");
    else if(seed === "" || !check(seed))alert("You must choose a seed, only numbers are allowed");
    else if(!youtube_parser(yt_link))alert("No Valid Link");
    else{
        dispatch(setComments({init:false}));
        setLoading(true);
        const testComments = await get_comments(yt_link, hashtag, dup);
        if(testComments){

            // const get Contract
            const raffle_contract = drizzle.contracts.Raffle;
            const trc_contract = drizzle.contracts.TrueRaffleCoin;
            //myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])
            const stack_id = "";

            testComments['name'] = name;
            testComments['choosenSeed'] = seed;
            let id = testComments.Link;
            let participants = testComments.comments.length;

            ipfs.addJSON(testComments, (err, result) => {
              console.log(err, result);
              if(!err){
                trc_contract.methods
                .approve(drizzle.contracts.Raffle.address, '1000000000000000000')
                .send({ from: drizzleState.accounts[0] })
                .on("transactionHash", (hash) => {
                  const stack_id = raffle_contract.methods.getWinner.cacheSend(seed,id,participants,name,result,{
                      from: drizzleState.accounts[0]
                  });
                  setRStackID(stack_id);
                  setLoading(false);
                })
              }
            });
        }else{
            alert("Some error occurred")
        }
    }
  }


  const getTxStatus = () =>{

     if(loading) return (
         <div>
         <p> Fetching Youtube comments</p>
         <div style = {{textAlign: "center"}}><LoadingLogo width = "100" height = "100" /></div>
         </div>
     );
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
       <RaffleRequestCard drizzle = {drizzle} drizzleState = {drizzleState} requestId = {req} txHash = {txHash}/>
     )
   }
   return (
       <div>
       <p> Waiting for Transaction</p>
       <div style = {{textAlign: "center"}}><LoadingLogo width = "100" height = "100" /></div>
       </div>
   );

  };

  const handleInput = (e)=>{
      setYTlink(e.target.value);
  }


  const handleHashtag = event => {
    setHashtag(event.target.value);
  };


  function DuplicateOnChange(e) {
    setDuplicate(e.target.checked);
  }


  return (
      <animated.div className="divs" style = {entry}>
        <h2>Youtube Raffle</h2>
        <p>every raffle costs one TrueRaffleCoin</p>
        <Input onChange = {changeName} className="in" placeholder ='Name'/>
        <Input onChange = {changeSeed} className="in" placeholder ='Seed'/>
        <div>
              <Input onChange={handleInput} className="in" placeholder="Link" />
              <Input onChange={handleHashtag} className="in" placeholder="Hashtag"/>
        </div>
        <Button type = "default" className="btn" onClick = {setValue} disabled = {loading}>Raffle</Button>
        <Checkbox onChange={DuplicateOnChange}>allow duplicates</Checkbox>
        <div>{getTxStatus()}</div>
      </animated.div>
  );
};
