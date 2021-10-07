import React from 'react';
import ACTIONS from './store/actions/index.js';
import store from "./store/index";
import PostSound from '../public/assets/sounds/post_sound.mp3'
import socketConnection from './socketConnection'


// import io from 'socket.io-client';
// let socket = io.connect(process.env.REACT_APP_BASE_URL)


// server-side
socketConnection.on("connect", () => {
   let token = localStorage.getItem('token')
   if (token) {
      socketConnection.emit("updateSocketId", token)
   }
});

 

socketConnection.on("sendFriendRequest", (data) => {
   // **************************************
   console.log("frind request api")
   let profileID = getuserProfile()._id
   if (profileID == data.Profile._id) {
      // ************************************** 
      new Audio(PostSound).play();

      store.dispatch(ACTIONS.socketUpdateProfile(data.Profile));
      if (data.request_id) {
         let whosend = data.Profile.followers.filter(list => list.user_id._id == data.request_id)
         if (whosend.length) {
            let notification = {
               name: whosend[0].user_id.name,
               profile: whosend[0].user_id.profile_photo,
               des: data.msg,
               time: data.Profile.created_at,
            } 
            store.dispatch(ACTIONS.addnotificaion(notification))
         }

      }

      console.log("storeData == you recived friend api request");
   }
});


socketConnection.on("addPost", (data) => {
   console.log("newpost",data)
   // **************************************
   let profileID = getuserProfile()._id
   let followers = getuserProfile().followings.map(data => { return data.user_id._id })
   // **************************************
   if (profileID !== data.posted_by._id && followers.includes(data.posted_by._id)) {
      new Audio(PostSound).play();
      store.dispatch(ACTIONS.addPost(data))


      let notification = {
         name: data.posted_by.name,
         profile: data.posted_by.profile_photo,
         des: "Your Follower created a post.",
         time: data.created_at
      }
      store.dispatch(ACTIONS.addnotificaion(notification)) 
   } else {
      console.log("storeData == your are not firend wrong api")
   }
});



const getuserProfile = () => {
   return store.getState().UserProfile.profile
}












