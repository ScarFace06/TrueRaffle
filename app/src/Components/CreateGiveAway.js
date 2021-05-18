import React, {useState} from 'react';
import {Button, Input, InputNumber, Select} from 'antd';
import {useSpring, animated, config} from 'react-spring';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const { Option } = Select;


export default  ({drizzle, drizzleState})=>{
    
    const entry = useSpring({
        from:{opacity:0, transform: 'translate3d(-100%,0,0)'},
        to:{opacity:1, transform: 'translate3d(0%,0,0)'},
        config:config.wobely
    });

    const [infos, setInfos] = useState(
        {
            name:"",
            owner:"",
            amount:"1",
            currency:"",
            discription:"",
            seed:1

        }
    );

    const [loadingState, setLoadingState] = useState(0);

    const loadingCoordinator =()=>{
        switch(loadingState){
            case 0:return null;
            case 1: return <p>Approving Link gas fees</p>;
            case 2: return <p>Approving GiveAway Price transfere</p>;
            case 3: return <p>Saving GiveAway information to IPFS</p>;
            case 4: return <p>Calling GiveAway Smartcontract</p>;
            case 5: return <p>Created GiveAway successfully</p>;
        }
    }


    const setName= (e)=>{
        setInfos({
            name:e.target.value,
            owner:infos.owner,
            amount:infos.amount,
            currency:infos.currency,
            discription: infos.discription,
            seed: infos.seed
        })
    }
    const setDisc= (e)=>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:infos.amount,
            currency:infos.currency,
            discription: e.target.value,
            seed: infos.seed
        })
    }
    const setAmount= (value)=>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:value,
            currency:infos.currency,
            discription: infos.discription,
            seed: infos.seed
        })
    }

    const setCurrency = (value) =>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:infos.amount,
            currency:value,
            discription: infos.discription,
            seed: infos.seed
        })
    }

    const setSeed = (value) =>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:infos.amount,
            currency:infos.currency,
            discription: infos.discription,
            seed: value
        })
    }


    const createGiveAway = ()=>{
        //TODO checks if all thing given are correct
        let res = {
            name : infos.name,
            owner:drizzleState.accounts[0],
            amount : transformValue(infos.amount),
            currency :getAddress(infos.currency),
            discription: infos.discription,
            seed:infos.seed
        };
        //TODO error 'insufficient allowance amount'
        //aprove gasfees
        setLoadingState(1);
        drizzle.contracts.LinkTokenInterface.methods
      .approve(drizzle.contracts.RaffleGiveAway.address, "100000000000000000")
      .send({ from: drizzleState.accounts[0] })
      .on("transactionHash", (hash) => {
            setLoadingState(2);
            let contract = res.currency == "TRC" ? drizzle.contracts.TrueRaffleCoin : drizzle.contracts.LinkTokenInterface;
            //aprove giveaway coin
            contract.methods.approve(drizzle.contracts.RaffleGiveAway.address, res.amount)
            .send({from: drizzleState.accounts[0]})
            .on("transactionHash",(hash2)=>{
                setLoadingState(3);
                //safe infos add ipfs

                ipfs.addJSON(res,(err,iphash)=>{
                    
                    //call create give away
                    setLoadingState(4);
                    drizzle.contracts.RaffleGiveAway.methods.createGiveAway(res.name,res.amount,res.currency,iphash,res.seed)
                    .send({from:drizzleState.accounts[0]})
                    .on("transactionHash",(finalHash)=>{
                        setLoadingState(5);

                    })


                });




            });

        

      })


        console.log(res);
    }


    const transformValue = ()=>{
        var am  = infos.amount;
        am = am.replace('.',"");
        if(am.length <4){
            am+="00000000000000000";
        }
        var i = 0;
        while(am[i]==="0")i++;
        am = am.substr(i);
        return am;
    }

    const getAddress =name=>{

        switch(name){
            case "TRC":return drizzle.contracts.TrueRaffleCoin.address;
            case "LINK":return drizzle.contracts.LinkTokenInterface.address;
            default: return "Fehler";
        }

    }




    return(
        <animated.div  style = {entry}>
            <Input onChange={setName}  placeholder="Name" />
            <Input onChange={setDisc}  placeholder="Discription" />
            <InputNumber
                style={{
                width: 200,
                }}
                defaultValue = {infos.seed}
                min="0"
                max="10000"
                step="1"
                onChange={setSeed}
                
            />
            <InputNumber
                style={{
                width: 200,
                }}
                defaultValue = {infos.amount}
                min="0"
                max="100"
                step="0.0000000000000001"
                onChange={setAmount}
                stringMode
            />
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a currency"
                
                onChange={setCurrency}
                
                
            >
                <Option value="TRC">TRC</Option>
                <Option value="LINK">LINK</Option>
            </Select>
            <Button onClick = {createGiveAway}>create Giveaway</Button>
            <div>{loadingCoordinator()}</div>

        </animated.div>
    );




}