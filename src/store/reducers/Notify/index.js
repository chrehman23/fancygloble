import constant from "../../actions/constant";
const initialState = {
  new: false,
  notificaitons: []
};

const Nofify = (state = initialState, action) => {
  switch (action.type) {
    case constant.ADD_NEW_NOTIFICAION:   
      return { new: true, notificaitons: [action.payload, ...state.notificaitons] }
    case constant.OPEN_NOTIFY:
      return { new: action.payload, notificaitons: state.notificaitons }
    default:
      return state;
  }
}


 
 

export default Nofify;