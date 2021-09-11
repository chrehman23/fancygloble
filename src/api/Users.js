import axios from "../axios";


let UsersApi = {
   getAllUsers: (data) => {
      return axios({
         url: "/api/users/getAllUsers",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   sendFriendRequest: (data) => {
      data.requested_at= new Date();
      return axios({
         url: "/api/users/sendFriendRequest",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   acceptFriendRequest: (data) => {
      data.accepted_at = new Date();
      return axios({
         url: "/api/users/acceptFriendRequest",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
   unfriendFriendRequest: (data) => { 
      return axios({
         url: "/api/users/unfriendFriendRequest",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         }
      })
   },
 

}
export default UsersApi

