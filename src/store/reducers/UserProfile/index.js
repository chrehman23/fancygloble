import constant from "../../actions/constant";
const initialState = {
  loading: true,
  profile: {}
};

const UserProfile = (state = initialState, action) => {
  switch (action.type) {
    case constant.LOAD_PROFILE:
      return {loading:false,profile:action.payload}
    case constant.UPDATE_FRIENDS:
      return {loading:false,profile:action.payload}
    case constant.SOCKET_PROFILE:
        return { loading: false, profile: action.payload }
    
    default:
      return state;
  }
}

 

export default UserProfile;