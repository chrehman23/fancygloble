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
   getSms: (data) => {
      return axios({
         url: "/api/chat/getSms",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   sendSms: (data) => {
      return axios({
         url: "/api/chat/sendSms",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
  


}
export default AuthApi

