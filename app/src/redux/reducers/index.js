import {combineReducers} from 'redux';
import requestIDReducer from './requestIDReducer';


const allReducers = combineReducers({
  requestID: requestIDReducer
});

export default allReducers;
