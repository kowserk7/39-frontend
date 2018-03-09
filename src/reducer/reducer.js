import {combineReducers} from 'redux';
import token from './auth';
import photo from './photo';

export default combineReducers({
  token, photo,
});