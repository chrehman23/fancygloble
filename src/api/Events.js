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
   getGoingEvents: (data) => {
    
      return axios({
         url: "/api/users/getGoingEvents",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   ownEvents: (data) => {
      return axios({
         url: "/api/users/ownEvents",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   goingtoEvent: (data) => {
      data.created_at = new Date();
      return axios({
         url: "/api/users/goingtoEvent",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   usersGoingToEvent: (data) => {
      return axios({
         url: "/api/users/usersGoingToEvent",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },
   eventStatus: (data) => {
      return axios({
         url: "/api/users/eventStatus",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },

      })
   },



}
export default Posts

