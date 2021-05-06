import {combineReducers} from 'redux';
import requestIDReducer from './requestIDReducer';
import commentsReducer from "./commentsReducer";
import winnerInfosReducer from "./winnerInfosReducer";


const allReducers = combineReducers({
  requestID: requestIDReducer,
  comments: commentsReducer,
  winnerInfos: winnerInfosReducer
});

export default allReducers;
