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
   getCommentsByPost: (data) => {
      return axios({
         url: "/api/users/getCommentsByPost",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   commentOnPost: (data) => {
      return axios({
         url: "/api/users/commentOnPost",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },


}
export default Posts

