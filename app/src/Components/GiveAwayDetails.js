
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {setGAInfos} from "../redux/actions";
import {Button, Result} from 'antd';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ({drizzle, drizzleState})=>{


    const data = useSelector(state=>state.giveawayInfos);
    const dispatch = useDispatch();
    const location = useLocation();
    const [gotData, setGotData] = useState(false);
    const [part, setPart]=useState("");

    useEffect(()=>{
        if(!data.chain || !data.ipfs){
            dataFromChain();
        }else{
            setGotData(true);
            
        }
        getParts();
        
    },[])

    const getParts=()=>{
        let par = [];
        
        drizzle.contracts.RaffleGiveAway.methods.getGiveAwayPartSize(location.pathname.substr(10)).call({from: drizzleState.accounts[0]})
        .then(res=>{
            console.log(res);
            for(let i = 0 ; i<parseInt(res);i++){

                drizzle.contracts.RaffleGiveAway.methods.getGiveAwayPart(location.pathname.substr(10),i).call({from: drizzleState.accounts[0]})
                .then(results=>{
                    par.push(results);
                })
            }
        });
        console.log(par);
        setPart(par);
    } 

    const dataFromChain = ()=>{
        const contract = drizzle.contracts.RaffleGiveAway;
        let id = location.pathname.substr(10);
        console.log(id);

        try{
            contract.methods.countToGiveAway(id).call({from: drizzleState.accounts[0]})
        .then(res=>{
            console.log(res);
            ipfs.catJSON(res.ipfs_hash, (err, result) => {
                console.log(err, result);
                if(!err){
                    dispatch(setGAInfos(res,result));
                    setGotData(true);
                }
                });
        });
        }catch (exception_var){
            console.log(exception_var)
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


    const takePart=()=>{
        drizzle.contracts.RaffleGiveAway.methods.takePart(location.pathname.substr(10)).send({from: drizzleState.accounts[0]})
        .then(res =>{
            console.log(res);
            dataFromChain();
            getParts();
        })
    }


    const resolveGiveAway=()=>{

        drizzle.contracts.LinkTokenInterface.methods.approve(drizzle.contracts.RaffleGiveAway.address, "100000000000000000").send({from:drizzleState.accounts[0]}).
        on("transactionHash", (hash)=>{
            drizzle.contracts.RaffleGiveAway.methods.resolveGiveAway(location.pathname.substr(10)).send({from: drizzleState.accounts[0]})
            .then(res =>{
                console.log(res);
            });
        });
        
    }
    
    

    //TODO user 
 

    return (
        <div>
            <p>Saved on the Blockchain</p>
            <p>this {data.chain.name}</p>
            <p>that</p>
            <p>ok</p>
            <p>Saved on ipfs</p>
            <p>that {data.ipfs.discription}</p>
            {data.chain.on_going ? <Button onClick = {takePart}>Take Part</Button>:null}
            {data.chain.owner == drizzleState.accounts[0] && data.chain.on_going ? <Button onClick = {resolveGiveAway}>Resolve GiveAway</Button>:null}

        </div>
    )




}