export default  (state = "", action)=>{
  switch (action.type){

    case "setRequestID":
          state = action.param;
          return state;
    default:
          return state;

  }
};
