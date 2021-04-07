import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button } from 'antd';
import { animated, useSpring} from "react-spring";



export default ({name, link, onClose})=>{

const [isOver, setIsOver] = useState(false);
const style = useSpring({scale: isOver ? 1.2:1})

const enter = ()=>{
  setIsOver(true);
}

const leave = ()=>{
  setIsOver(false);
}




  return (
    <animated.p  style = {style} onMouseEnter={enter} onMouseOut={leave} onClick = {onClose} >
      <Button type ="link"  >
        <Link to = {link} >{name}</Link>
      </Button>
  </animated.p>
);
};
