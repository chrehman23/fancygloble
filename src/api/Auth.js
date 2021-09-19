import axios from "../axios";


let AuthApi = {
   login: (data) => {
      return axios({
         url: "/api/users/loginByUser",
         data,
         method: "post",
      })
   },
   UserRegister: (data) => {
      return axios({
         url: "/api/users/UserRegister",
         data,
         method: "post",
      })
   },
   getUserProfile: (data) => {
      return axios({
         url: `/api/users/getUserProfile/${data}`,
         data,
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   getUserProfileByToken: (data) => {
      return axios({
         url: "/api/users/getUserProfileByToken",
         data,
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },


}
export default AuthApi

