import React, {useState} from "react";
import { Input } from "antd";
import { Button } from 'antd';

const InstagramRaffle = () => {

    const [searchInfo, setSearchInfo] = useState(" ");

    const handleInput = event => {
      setSearchInfo(event.target.value);
    };

    const logValue = () => {
      console.log(searchInfo);
    };

    return (
        <div>
            <h3 style = {{textAlign: "center"}}>Instagram</h3>
            <Input onChange={handleInput} placeholder="Link" />
            <Button onClick={logValue} type="primary">Search</Button>
        </div>
    );
};

export default InstagramRaffle;
