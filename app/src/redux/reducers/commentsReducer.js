export default  (state = {}, action)=>{
  switch (action.type){

    case "setComments":
          state = action.param;
          return state;
    default:
          return state;

  }
};
