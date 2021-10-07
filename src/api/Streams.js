import axios from "../axios";


let AuthApi = {
   liveStreamList: (data) => {
      return axios({
         url: "/api/users/liveStreamList",
         data,
         method: "post",
      })
   },
   streamDetails: (data) => {
      return axios({
         url: "/api/users/streamDetails",
         data,
         method: "post",
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
  


}
export default AuthApi

