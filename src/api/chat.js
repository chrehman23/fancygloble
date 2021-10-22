import axios from "../axios";


let AuthApi = {
   findRoomsByUser: (data) => {
      return axios({
         url: "/api/chat/findRoomsByUser",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
  


}
export default AuthApi

