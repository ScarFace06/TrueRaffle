import React, {useState} from "react";
import { Input } from "antd";
import { Button } from 'antd';

function Raffle() {

    const [searchInfo, setSearchInfo] = useState(" ");

    const handleInput = event => {
      setSearchInfo(event.target.value);  
    };
  
    const logValue = () => {
      console.log(searchInfo);
    };
    
    return (
        <div>
            <Input onChange={handleInput} placeholder="Link" />
            <Button onClick={logValue} type="primary">Search</Button>
        </div>
    );
}

export default Raffle;