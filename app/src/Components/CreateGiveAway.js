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

        }
    );


    const setName= (e)=>{
        setInfos({
            name:e.target.value,
            owner:infos.owner,
            amount:infos.amount,
            currency:infos.currency,
            discription: infos.discription
        })
    }
    const setDisc= (e)=>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:infos.amount,
            currency:infos.currency,
            discription: e.target.value
        })
    }
    const setAmount= (value)=>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:value,
            currency:infos.currency,
            discription: infos.discription
        })
    }

    const setCurrency = (value) =>{
        setInfos({
            name:infos.name,
            owner:infos.owner,
            amount:infos.amount,
            currency:value,
            discription: infos.discription
        })
    }


    const createGiveAway = ()=>{

    }


    const transformValue = ()=>{
        var am  = infos.amount;
        am.replace(".","");
        if(am.length >4){
            //Todo 
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

        </animated.div>
    );




}