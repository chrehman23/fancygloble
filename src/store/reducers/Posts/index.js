import constant from "../../actions/constant";
const initialState = [];

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case constant.REMOVE_POSTS:
      return []
    case constant.ADD_POSTS:
      return action.payload
    case constant.ADD_POST:
      return [action.payload, ...state]
    case constant.ADD_NEW_POSTS:
      return state.concat(action.payload)
    case constant.ADD_COMMENTS:
      let filterdIndex = state.findIndex(data => data._id == action.payload.post_id);
      state[filterdIndex].comments = action.payload.comments
      console.log("ss", action.payload)
      return state
    case constant.ADD_COMMENT:
      let filterdIndex2 = state.findIndex(data => data._id == action.payload.post_id);
      state[filterdIndex2].comments = [action.payload.comments, ...state[filterdIndex2].comments]
      console.log("ss", action.payload)
      return state
    default:
      return state;
  }
}
export default Posts;