export default  (state = {init: false}, action)=>{
  switch (action.type){

    case "setComments":
          state = action.param;
          return state;
    default:
          return state;

  }
};
