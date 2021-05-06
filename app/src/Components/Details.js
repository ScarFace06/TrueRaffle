
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {setReduxWinnerInfos} from "../redux/actions";
import {Button, Result} from 'antd';
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

    return (
        <div>
            <p>Saved on the Blockchain</p>
            <p>this {data.chain.name}</p>
            <p>that</p>
            <p>ok</p>
            <p>Saved on ipfs</p>
            <p>that {data.ipfs.Link}</p>
            
        </div>
    )




}