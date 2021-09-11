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
    default:
      return state;
  }
}
export default Posts;