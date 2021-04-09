import React, {useState} from "react";
import { Input } from "antd";
import { Button } from 'antd';
import {get_comments} from "../API/ytAPI";
import {useSelector} from 'react-redux';

function YoutubeRaffle() {

    const [searchInfo, setSearchInfo] = useState(" ");
    const data = useSelector(state => state.comments);
    const handleInput = event => {
      setSearchInfo(event.target.value);
    };

    const logValue = () => {
      get_comments(searchInfo);

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
