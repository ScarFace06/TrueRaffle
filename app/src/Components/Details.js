
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {setReduxWinnerInfos} from "../redux/actions";
import {Button, Result} from 'antd';

import { Table, Tag, Space } from 'antd';

const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ({drizzle, drizzleState})=>{


    const data = useSelector(state=>state.winnerInfos);
    const dispatch = useDispatch();
    const location = useLocation();
    const [gotData, setGotData] = useState(false);

    useEffect(()=>{
        if(!data.chain || !data.ipfs){
            dataFromChain();
        }else{
            setGotData(true);
        }
        
    },[])


    const dataFromChain = ()=>{
        const contract = drizzle.contracts.Raffle;
        let id = location.pathname.substr(9);
        console.log(id);

        try{
            contract.methods.requestIDtoRInfos(id).call({from: drizzleState.accounts[0]})
        .then(res=>{
            console.log(res);
            ipfs.catJSON(res.ipfs_hash, (err, result) => {
                console.log(err, result);
                if(!err){
                    dispatch(setReduxWinnerInfos(res,result));
                    setGotData(true);
                }
                });
        });
        }catch{
            alert("No such id");
        }
        
    }

    if(!gotData){

        return(
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><Link to = "/">Back Home</Link></Button>}
            />
        )
    }


    


    //TODO Daten darstellen 

    /**IPFS JSON
        {platform: "Youtube", Link: "https://www.youtube.com/watch?v=ysrdpBq6z4Q", comments: Array(113), name: "TestDetails", choosenSeed: "420"}
        Link: "https://www.youtube.com/watch?v=ysrdpBq6z4Q"
        choosenSeed: "420"
        comments: (113) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
        name: "TestDetails"
        platform: "Youtube"
        __proto__: Object
     */


    /*BlockChainInfos
        {
            0(pin):"TestDetails"
            1(pin):"https://www.youtube.com/watch?v=ysrdpBq6z4Q"
            2(pin):"QmaV2sJNyCNqtGvK3ciWXBjsJ4wjBur13GGVLRYgfh4mGN"
            3(pin):"86"
            4(pin):"113"
            5(pin):"0xdf8216d196a2ced07b6a2482da51040c0c0c0e7832453afee8c861b73d10e85e"
            name(pin):"TestDetails"
            id(pin):"https://www.youtube.com/watch?v=ysrdpBq6z4Q"
            ipfs_hash(pin):"QmaV2sJNyCNqtGvK3ciWXBjsJ4wjBur13GGVLRYgfh4mGN"
            winner(pin):"86"
            part_count(pin):"113"
            chainlinkRequestID(pin):"0xdf8216d196a2ced07b6a2482da51040c0c0c0e7832453afee8c861b73d10e85e"
        }
    
    */


        const columns = [
            {
              title: 'Index',
              dataIndex: 'index',
              key: 'index',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Comment',
              dataIndex: 'comment',
              key: 'comment',
            }
          ];

          let iterator = 0;
          const data_comments = [];
          data.ipfs.comments.forEach(com => {
              let dat = {
                  index: iterator,
                  name: com.user,
                  comment: com.comment
              }
              data_comments.push(dat);
              iterator++;
          });

          let winner = data_comments[data.chain.winner].name;

    // Table oder list für Kommentare erstellen ==> count user comment
    return (
        <div>
            <div class="blockchainInfos">
                <p>Raffle: {data.chain.name}</p>
                <p>YouTube link: <a href={data.chain.id}>{data.chain.id}</a></p>
                <p>IPFS hash: {data.chain.ipfs_hash}</p>
                <p>Winner: {winner}</p>
                <p>Index: {data.chain.winner}</p>
                <p>Participants: {data.chain.part_count}</p>
                <p>Chainlink request ID: {data.chain.chainlinkRequestID}</p>
            </div>

            <Table columns={columns} dataSource={data_comments} size="small" />

            <div class="ipfsInfos">
                <a href={"https://ipfs.io/ipfs/"+data.chain.ipfs_hash}>Check on IPFS</a>
                <br/>
                <a href={data.ipfs.Link}>Check Youtube Link</a>
                <p>Platform: {data.ipfs.platform}</p>
                <p>Seed: {data.ipfs.choosenSeed}</p>
                

            </div>
        </div>
    )




}