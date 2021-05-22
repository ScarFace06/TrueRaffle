import {combineReducers} from 'redux';
import requestIDReducer from './requestIDReducer';
import commentsReducer from "./commentsReducer";
import winnerInfosReducer from "./winnerInfosReducer";
import giveawayred from './giveawayred';


const allReducers = combineReducers({
  requestID: requestIDReducer,
  comments: commentsReducer,
  winnerInfos: winnerInfosReducer,
  giveawayInfos:giveawayred
});

export default allReducers;
