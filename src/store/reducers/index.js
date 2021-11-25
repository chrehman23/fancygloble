import Posts from './Posts/index'; 
import UserProfile from './UserProfile/index'; 
import Nofify from './Notify/index';
import Rooms from './rooms/index';

import { combineReducers } from 'redux'


const RouteReducers = combineReducers({
  Posts, 
  UserProfile,
  Nofify,
  Rooms,
});

export default RouteReducers;