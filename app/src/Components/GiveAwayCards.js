import React, {useEffect, useState} from "react";
import {Button} from 'antd';
import { Card } from 'antd';
import {useSpring, animated, config} from 'react-spring';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {setGAInfos} from '../redux/actions';
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

  const [chain, setChain] = useState(false);
  const [ipfsData, setIpfsData] = useState(false);
  const [gotData, setGotData] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(()=>{
    const contract = drizzle.contracts.RaffleGiveAway;
    const dk = contract.methods.countToGiveAway.cacheCall(position);
    console.log(dataKey);
    setDataKey(dk)

  },[])


const style = useSpring({
  scale: isOver ? 1.1 : 0.9
})
const entry = useSpring({
  from:{opacity:0, transform: 'translate3d(-100%,0,0)'},
  to:{opacity:1, transform: 'translate3d(0%,0,0)'},
  config:config.wobely
});

const enter = ()=>{
  setIsOver(true);
}

const leave = ()=>{
  setIsOver(false);
}

const loadCard = ()=>{

  let infos = drizzleState.contracts.RaffleGiveAway.countToGiveAway[dataKey];

  if(!infos)return(
    <Card loading = {true} title = {position.toString()} className = "child">
      <p>..............</p>
      <p>..............</p>
      <p>..............</p>
      <p>..............</p>
      <p>..............</p>
      <p>..............</p>
    </Card>
  )

  /*
  ipfs object
amount: "100000000000000000"
currency: "0xa36085F69e2889c224210F603D836748e7dC0088"
discription: "test"
name: "tets"
owner: "0x73A60eA66eA0fE10545EC147cec401f184f67557"
seed: 1
__proto__: Object
  */

    /**
     * chain obj
args: Arguments [2, callee: (...), Symbol(Symbol.iterator): ƒ]
error: null
fnIndex: 3
value: Result
0: "again"
1: "0x73A60eA66eA0fE10545EC147cec401f184f67557"
2: "8800000000000000000"
3: "0xa36085F69e2889c224210F603D836748e7dC0088"
4: "0x0000000000000000000000000000000000000000000000000000000000000000"
5: "0"
6: "QmR6enT2HRz1m2nLDScdnhMy1f7HkjihKngYe2VM3yKphP"
7: true
8: "2"
9: "1"
amount: "8800000000000000000"
cl_request_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
currency: "0xa36085F69e2889c224210F603D836748e7dC0088"
id: "2"
ipfs_hash: "QmR6enT2HRz1m2nLDScdnhMy1f7HkjihKngYe2VM3yKphP"
name: "again"
on_going: true
owner: "0x73A60eA66eA0fE10545EC147cec401f184f67557"
seed: "1"
winner: "0"
     */
  
  if(!gotData){
      console.log(infos);
      setChain(infos.value);
    ipfs.catJSON(infos.value.ipfs_hash, (err, result) => {
    console.log(err, result);
    console.log(result);
    setIpfsData(result);
    });
    setGotData(true);
  }

  const clicked =()=>{
        console.log(chain);
        dispatch(setGAInfos(chain,ipfsData));
        history.push("/Giveaway/"+chain.id);
  }
//maybe do currency string in data
  return(
      <animated.div style = {style} >
        <Card  title = {chain.name + (!chain.on_going ? " Resolved":" ")} className = "child" onMouseOver = {enter} onMouseOut = {leave} >
            <p>ID: {chain.id}</p>
            <p>Discription : {ipfsData.discription}</p>
            <p>Prize : {chain.amount} {chain.currency}</p>
            <Button onClick= {clicked} >See the Details</Button>
        </Card>
    </animated.div>

  );



}



  return (
      <animated.div style = {entry}>
        {loadCard()}
      </animated.div>
  );
};
