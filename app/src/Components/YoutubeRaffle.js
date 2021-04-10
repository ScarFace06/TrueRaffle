import React, {useState} from "react";
import { Input } from "antd";
import { Button } from 'antd';
import {get_comments} from "../API/ytAPI";

function YoutubeRaffle() {

    const [searchInfo, setSearchInfo] = useState(" ");
    const [hashtag, setHashtag] = useState("");

    const handleInput = event => {
      setSearchInfo(event.target.value);
    };

    const handleHashtag = event => {
        setHashtag(event.target.value);
      };

    const logValue = async () => {
       const comments = await get_comments(searchInfo, hashtag);
       if(comments){
           console.log(comments);
       }else {
           alert("an error occurred");
       }

    };



    return (
        <div>
            <h3 style = {{textAlign: "center"}}>Youtube</h3>
            <Input onChange={handleInput} placeholder="Link" />
            <Input onChange={handleHashtag}placeholder="Hashtag"/>
            <Button onClick={logValue} type="primary">Search</Button>
        </div>
    );
}

export default YoutubeRaffle;
