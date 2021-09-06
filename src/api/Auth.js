import axios from "../axios";
let AuthApi = {
   login: (data) => {
      return axios({
         url: "/api/users/loginByUser",
         data,
         method: "post",
      })
   },


   // adminUpdatePasssword: (data) => {
   //    return axios({
   //       url: "/api/adminUpdatePasssword",
   //       data,
   //       method: "post",
   //       headers: {
   //          authorization: "Bearer " + localStorage.getItem("token"),
   //       }
   //    })
   // },

}
export default AuthApi

