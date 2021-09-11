import ACTIONTYPES from "./constant";
let Actions = {
  addPosts: (data) => {  
    return {
      type: ACTIONTYPES.ADD_POSTS,
      payload: data,
    };
  }, 
  addPost: (data) => {  
    return {
      type: ACTIONTYPES.ADD_POST,
      payload: data,
    };
  }, 
  removePosts: (data) => {  
    return {
      type: ACTIONTYPES.REMOVE_POSTS,
      payload: data,
    };
  }, 
  loadProfile: (data) => {  
    return {
      type: ACTIONTYPES.LOAD_PROFILE,
      payload: data,
    };
  }, 
  updateProfileFriends: (data) => {  
    return {
      type: ACTIONTYPES.UPDATE_FRIENDS,
      payload: data,
    };
  }, 
  socketUpdateProfile: (data) => {  
    return {
      type: ACTIONTYPES.SOCKET_PROFILE,
      payload: data,
    };
  }, 
 addnotificaion : (data) => {    
    return {
      type: ACTIONTYPES.ADD_NEW_NOTIFICAION,
      payload: data,
    };
  }, 
  openNotify : (data) => {
    return {
      type: ACTIONTYPES.OPEN_NOTIFY,
      payload: false,
    };
  }, 


}
export default Actions

