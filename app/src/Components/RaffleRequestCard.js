import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Card } from 'antd';
import {setComments} from '../redux/actions';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });




export default ({ drizzle, drizzleState, requestId, txHash }) => {
  // destructure drizzle and drizzleState from props
  const [winnerInfos, setWinnerInfos] = useState({
    winner:"...loading",
    comment:"....loading",
    time:"......loading",
    id:"....Loading",
    name: "...Loading",
    part: "....."
  });
  const [loading, setLoading] = useState(true);
  const data = useSelector(state=>state.comments);
  const dispatch = useDispatch();



const getData = (hash)=>{
    if(!data.init){
      ipfs.catJSON(hash, (err, result) => {
        console.log(err, result);
        result['init'] = true;
        dispatch(setComments(result));
        });
    }
};


const loadCard =  ()=>{

    const contract = drizzle.contracts.Raffle;
  if(loading){

      contract.methods.requestIDtoRInfos(requestId,).call({from: drizzleState.accounts[0]}).then(result=>{
        console.log(result);
            getData(result.ipfs_hash);
          let win_num = parseInt(result.winner);
          let part_num = parseInt(result.part_count);
          if(win_num<part_num){
            setWinnerInfos({
              winner:data.comments[win_num].user,
              comment:data.comments[win_num].comment,
              time:data.comments[win_num].time,
              id:result.id,
              name: result.name,
              part: result.part_count
            });
            setLoading(false);
          }

      });

  }


    return(
      <Card loading = {loading} title = {loading ? requestId: winnerInfos.name} className = "child_req">
        <p> ID = {winnerInfos.id}</p>
        <p> Winner = {winnerInfos.winner}</p>
        <p> Winner comment = {winnerInfos.comment}</p>
        <p> Time {winnerInfos.time}</p>
        <p> Participants = {winnerInfos.part}</p>
        <p> txHash = {txHash}</p>
      </Card>
    )

    /*
    id: "https://www.youtube.com/watch?v=GH5j7uT12jY"
    ipfs_hash: "QmYa1BEC4iV1z3yDxmiNXVXEjWzNWaU9CJFUy5MUNZqeZ5"
    name: "Initial_test"
    part_count: "79"
    winner: "58"
    */

    /*
    Result 
    {0: "ss", 1: "https://www.youtube.com/watch?v=jx5jmI0UlXU",
    2: "QmX6yj5HpeeF9UYVdWVg4d9XBbnTxT68faWKayvviEWdBw",
    3: "918",
    4: "917",
    name: "ss",
    id: "https://www.youtube.com/watch?v=jx5jmI0UlXU",
    ipfs_hash: "QmX6yj5HpeeF9UYVdWVg4d9XBbnTxT68faWKayvviEWdBw",
    winner: "918",
    part_count: "917"}
  Raffle*/

}



  return (
      <div>
        {loadCard()}
      </div>
  );
};
