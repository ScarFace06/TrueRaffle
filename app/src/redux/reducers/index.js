import {combineReducers} from 'redux';
import requestIDReducer from './requestIDReducer';
import commentsReducer from "./commentsReducer";


const allReducers = combineReducers({
  requestID: requestIDReducer,
  comments: commentsReducer
});

export default allReducers;
