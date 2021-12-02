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
   updateCourseSection: (data) => {
      return axios({
         url: "/api/users/updateCourseSection",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   deleteCourseSection: (data) => {
      return axios({
         url: "/api/users/deleteCourseSection",
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
   lecture_enroll: (data) => {
      return axios({
         url: "/api/users/lecture_enroll",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   courseComments: (data) => {
      return axios({
         url: "/api/users/courseComments",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   addCourseComment: (data) => {
      return axios({
         url: "/api/users/addCourseComment",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   addCourseCommentReply: (data) => {
      return axios({
         url: "/api/users/addCourseCommentReply",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   courseCommentsReply: (data) => {
      return axios({
         url: "/api/users/courseCommentsReply",
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
   addLactureDocument: (data) => {
      return axios({
         url: "/api/users/addLactureDocument",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   removeLactureDocument: (data) => {
      return axios({
         url: "/api/users/removeLactureDocument",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
   coursePayment: (data) => {
      data.created_at = new Date()
      return axios({
         url: "/api/users/coursePayment",
         data,
         method: "post",
         headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
         },
      })
   },
 


}
export default CourseApi

