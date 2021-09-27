import axios from "../axios";
let Posts = {
   addEvent: (data) => {
      return axios({
         url: "/api/users/addEvent",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   getEvents: (data) => {
      return axios({
         url: "/api/users/getEvents",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   searchEvents: (data) => {
      return axios({
         url: "/api/users/searchEvents",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
 


}
export default Posts

