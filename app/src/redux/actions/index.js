
export const setRequestID = (par)=>{
  return{
    type:"setRequestID",
    param:par
  };
};

export const setComments = (par)=>{
  return {
    type:"setComments",
    param:par
  }
}

export const setReduxWinnerInfos = (chain, ipfs)=>{

  return{
    type: "setWinnerInfos",
    param1: chain,
    param2: ipfs
  }


}
