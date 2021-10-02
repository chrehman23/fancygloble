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
   updateUserProfile: (data) => {
      return axios({
         url: "/api/users/updateUserProfile",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
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
   socialLogin: (data) => {
      return axios({
         url: "/api/users/socialLogin",
         data,
         method: "post",
      })
   },
   sendResetPasswordOtp: (data) => {
      return axios({
         url: "/api/users/sendResetPasswordOtp",
         data,
         method: "post",
      })
   },
   otpVerification: (data) => {
      return axios({
         url: "/api/users/otpVerification",
         data,
         method: "post",
      })
   },
   resetPassword: (data) => {
      return axios({
         url: "/api/users/resetPassword",
         data,
         method: "post",
      })
   },


}
export default AuthApi

