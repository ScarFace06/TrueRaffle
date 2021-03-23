import React, {useState} from "react";
import { Input } from "antd";
import { Button } from 'antd';
import {execute} from "../API/ytAPI";

function YoutubeRaffle() {

    const [searchInfo, setSearchInfo] = useState(" ");

    const handleInput = event => {
      setSearchInfo(event.target.value);  
    };
    
    const logValue = () => {
      execute(searchInfo);
    };
    
    return (
        <div>
            <h3 style = {{textAlign: "center"}}>Youtube</h3>
            <Input onChange={handleInput} placeholder="Link" />
            <Button onClick={logValue} type="primary">Search</Button>
        </div>
    );
}

export default YoutubeRaffle;