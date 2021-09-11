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
         url: "/api/users/getUserProfile",
         data,
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },


}
export default AuthApi

