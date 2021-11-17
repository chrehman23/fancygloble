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
  addnotificaion: (data) => {
    return {
      type: ACTIONTYPES.ADD_NEW_NOTIFICAION,
      payload: data,
    };
  },
  openNotify: (data) => {
    return {
      type: ACTIONTYPES.OPEN_NOTIFY,
      payload: false,
    };
  },
  addcomments: (data) => {
    return {
      type: ACTIONTYPES.ADD_COMMENTS,
      payload: data,
    };
  },
  addcomment: (data) => {
    return {
      type: ACTIONTYPES.ADD_COMMENT,
      payload: data,
    };
  },
  newPosts: (data) => {
    return {
      type: ACTIONTYPES.ADD_NEW_POSTS,
      payload: data,
    };
  },
  addPaidPost: (data) => {
    return {
      type: ACTIONTYPES.ADD_PAID_POST,
      payload: data,
    };
  },
  addRooms: (data) => {
    return {
      type: ACTIONTYPES.ADD_ROOM,
      payload: data,
    };
  },
  showRoom: (data) => {
    return {
      type: ACTIONTYPES.SHOW_ROOM,
      payload: data,
    };
  },
  updateRoom: (data) => {
    return {
      type: ACTIONTYPES.UPDATE_ROOM,
      payload: data,
    };
  },
  update_user_room: (data) => {
    return {
      type: ACTIONTYPES.UPDATE_USER_ROOM,
      payload: data,
    };
  },


}
export default Actions

