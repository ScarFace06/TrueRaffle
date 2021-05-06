export default (state = {chain: false, ipfs : false}, action)=>{

    switch(action.type){

        case "setWinnerInfos":
            state.chain = action.param1;
            state.ipfs = action.param2;
            return state;
        default:
            return state;

    }


};