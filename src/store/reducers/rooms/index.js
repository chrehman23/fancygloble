import constant from "../../actions/constant";
const initialState = [];

const Rooms = (state = initialState, action) => {
  switch (action.type) {
    case constant.ADD_ROOM:
      return action.payload
    case constant.SHOW_ROOM:
      let rooms = state;
      let room_index = state.findIndex(data => data.room_id == action.payload);
      console.log("room_index", room_index)
      console.log("room_index", action.payload)
      if (room_index >= 0) {
        let room_info = rooms[room_index];
        room_info.un_read = 0;
        rooms[room_index] = room_info
      }
      return rooms
    case constant.UPDATE_ROOM:
      let rooms_data = state;
      let rooms_index = state.findIndex(data => data.room_id == action.payload.room);
      if (rooms_index >= 0) {
        let rooms_info = rooms_data[rooms_index]
        console.log(rooms_data[rooms_index].un_read)
        rooms_info.un_read = rooms_data[rooms_index].un_read + 1;
        rooms_info.last_message = action.payload;
        rooms_data[rooms_index] = rooms_info
      }
      return rooms_data
    case constant.UPDATE_USER_ROOM:
      let roomsData = state.map(data => {
        if (data.user._id == action.payload.user_id) {
          data.online = action.payload.online
        }
        return data
      })
      return roomsData
    default:
      return state;
  }
}



export default Rooms;