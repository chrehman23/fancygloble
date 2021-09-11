import axios from "../axios";
let Posts = {
   getPostsByuser: (data) => {
      return axios({
         url: "/api/users/getPostsByuser",
         method: "get",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   addPostByUser: (data) => {
      return axios({
         url: "/api/users/addPostByUser",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },


}
export default Posts

