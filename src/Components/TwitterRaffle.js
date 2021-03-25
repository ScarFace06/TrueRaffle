import React, {useState} from "react";
import { Input } from "antd";
import { Button } from 'antd';
import { get_retweets } from "../API/twAPI";

const TwitterRaffle = () => {

    const [searchInfo, setSearchInfo] = useState(" ");

    const handleInput = event => {
      setSearchInfo(event.target.value);  
    };
  
    const logValue = () => {
      get_retweets(searchInfo);

    };
    
    return (
        <div>
            <h3 style = {{textAlign: "center"}}>Twitter</h3>
            <Input onChange={handleInput} placeholder="Link" />
            <Button onClick={logValue} type="primary">Search</Button>
        </div>
    );
};

export default TwitterRaffle;