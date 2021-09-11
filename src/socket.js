import React from 'react'; 
import ACTIONS from './store/actions/index.js';
import store from "./store/index";
import PostSound from '../public/assets/sounds/post_sound.mp3'
import io from 'socket.io-client';
let socket = io.connect(process.env.REACT_APP_BASE_URL)
 
socket.on("sendFriendRequest", (data) => { 
   console.log("req", data)
   // return
   // **************************************
   let profileID = getuserProfile()._id 
   if (profileID == data.datas._id) {
   // ************************************** 
   new Audio(PostSound).play();
      store.dispatch(ACTIONS.socketUpdateProfile(data.datas));
      if (data.request_id){
         let whosend = data.datas.friends.filter(list => list.friend_id._id == data.request_id)
         console.log("whosend",whosend)
         console.log("request_id", data.request_id)
         if (whosend.length){
            let notification = {
               name: whosend[0].friend_id.name,
               profile: whosend[0].friend_id.profile_photo,
               des: data.msg,
               time: data.datas.created_at,
            }
            console.log("notification", notification)
         store.dispatch(ACTIONS.addnotificaion(notification))
         }
         
      }
   
      console.log("storeData == you recived friend api request");
} 
});


socket.on("addPost", (data) => { 
   // **************************************
   let profileID = getuserProfile()._id
   let friends = getuserProfile().friends.map(data => { return data.friend_id._id})
   // **************************************
   if (profileID !== data.posted_by._id && friends.includes(data.posted_by._id)){
      new Audio(PostSound).play();
      store.dispatch(ACTIONS.addPost(data))


      let notification = {
         name: data.posted_by.name,
         profile: data.posted_by.profile_photo,
         des: "Your friend created a post.",
         time: data.created_at
      }
      store.dispatch(ACTIONS.addnotificaion(notification))
      console.log("storeData == your are firend")
   }else{
      console.log("storeData == your are not firend")
   }   
});


const getuserProfile = ()=>{
 return store.getState().UserProfile.profile
}
 
 
  









