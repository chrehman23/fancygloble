import Posts from './Posts/index'; 
import UserProfile from './UserProfile/index'; 
import Nofify from './Notify/index';

import { combineReducers } from 'redux'


const RouteReducers = combineReducers({
  Posts, 
  UserProfile,
  Nofify,
});

export default RouteReducers;