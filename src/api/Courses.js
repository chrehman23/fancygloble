import axios from "../axios";


let CourseApi = {
   addCourse: (data) => {
      return axios({
         url: "/api/users/addCourse",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   updateCourse: (data) => {
      return axios({
         url: "/api/users/updateCourse",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   courseDetails: (data) => {
      return axios({
         url: "/api/users/courseDetails",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   addCourseSection: (data) => {
      return axios({
         url: "/api/users/addCourseSection",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   courseSections: (data) => {
      return axios({
         url: "/api/users/courseSections",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   addLacture: (data) => {
      return axios({
         url: "/api/users/addLacture",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   getLactures: (data) => {
      return axios({
         url: "/api/users/getLactures",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   allCourses: (data) => {
      return axios({
         url: "/api/users/allCourses",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   myCourses: (data) => {
      return axios({
         url: "/api/users/myCourses",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
 


}
export default CourseApi

