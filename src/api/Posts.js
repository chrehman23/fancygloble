import axios from "../axios";
let Posts = {
   getPostsByuser: (data) => {
      return axios({
         url: "/api/users/getPostsByuser",
         data,
         method: "post",
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
   emojisByPost: (data) => {
      return axios({
         url: "/api/users/emojisByPost",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   emojiOnPost: (data) => {
      return axios({
         url: "/api/users/emojiOnPost",
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   getPost: (data) => {
      return axios({
         url: `/api/users/getPost?post_id=${data}`,
         method: "get",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   purchasePost: (data) => {
      data.created_at = new Date();
      return axios({
         url: `/api/users/purchasePost`,
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   stripePaymentRequest: (data) => {
      data.created_at = new Date();
      return axios({
         url: `/api/users/stripePaymentRequest`,
         method: "post",
         data,
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },


}
export default Posts

