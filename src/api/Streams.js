import axios from "../axios";


let AuthApi = {
   liveStreamList: (data) => {
      return axios({
         url: "/api/users/liveStreamList",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   streamDetails: (data) => {
      return axios({
         url: "/api/users/streamDetails",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   goLive: (data) => {
      return axios({
         url: "/api/users/goLive",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   streamChat: (data) => {
      return axios({
         url: "/api/users/streamChat",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   eventGolive: (data) => {
      return axios({
         url: "/api/users/eventGolive",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   startLiveLecture: (data) => {
      return axios({
         url: "/api/users/startLiveLecture",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
  


}
export default AuthApi

