import React, {useState, useEffect} from "react";
import {useSpring, animated, config} from 'react-spring';
import GiveAwayCards from "./GiveAwayCards";


export default ({drizzle, drizzleState}) =>{

    const [dataKey, setDataKey] = useState('');

    const entry = useSpring({
        from:{opacity:0, transform: 'translate3d(-100%,0,0)'},
        to:{opacity:1, transform: 'translate3d(0%,0,0)'},
        config:config.wobely
    });

    useEffect(()=>{
        const contract = drizzle.contracts.RaffleGiveAway;
        //console.log(drizzleState)
        const dk = contract.methods.count.cacheCall();
        //console.log(dataKey);
        setDataKey(dk)
        // ok the data cant be getted on load cuz drizzleState takes a while
    
      },[drizzleState])


    let count = drizzleState.contracts.RaffleGiveAway.count[dataKey];

    const getCards = (v)=>{
    let res = []
    for(var i = 0; i<v; i++){
        res.push(<GiveAwayCards drizzle = {drizzle} drizzleState = {drizzleState} position = {i}/>)
    }
    return res;
    }

    return(
        <animated.div style = {entry}>
            <h2>GiveAways</h2>
            <div>{count && getCards(parseInt(count.value))}</div>

        </animated.div>
    )
}