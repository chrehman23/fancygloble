import React, { useState, useEffect } from 'react';
import ACTIONS from '../store/actions/index.js.js'
import PostSound from '../../public/assets/sounds/post_sound.mp3'

import UserApi from '../api/Users'
import { useSelector, useDispatch } from 'react-redux';


let SendFriendRequest = (props) => {
    const dispatch = useDispatch()
    const friends = useSelector(data => data.UserProfile.profile.friends)

    const [apiLoader, setapiLoader] = useState(false);
    const [friStatus, setfriStatus] = useState('');

    useEffect(() => {
        console.log("friends", friends)
        let indexs = friends && friends.findIndex(data => data.friend_id._id==props.user._id)
        console.log("indexs", indexs)
       if(indexs>=0){
        //    alert(friends[indexs].status)
           setfriStatus(friends[indexs].status)
       }else{
           setfriStatus('')
       }
        
    }, [friends])



    let sendFrindRe = (id) => {
        setapiLoader(true) 
        let data = {
            friend_id: id,
        }
        UserApi.sendFriendRequest(data).then(res => {
            console.log(res)
            setapiLoader(false) 
            
            dispatch(ACTIONS.updateProfileFriends(res.data.profile)) 
            new Audio(PostSound).play();
        }).catch(error => {
            setapiLoader(false)
            console.log(error)
        })
    }

    let acceptFriendRequest = (id) => {
        setapiLoader(true)
        let data = {
            friend_id: id,
        }
        UserApi.acceptFriendRequest(data).then(res => {
            console.log(res)
           setapiLoader(false) 
            dispatch(ACTIONS.updateProfileFriends(res.data.profile))
            new Audio(PostSound).play();
        }).catch(error => {
           setapiLoader(false) 
            console.log(error)
        })
    }
    let unfriendFriendRequest = (id) => {
        setapiLoader(true)
        let data = {
            friend_id: id,
        }
        UserApi.unfriendFriendRequest(data).then(res => {
            console.log(res)
            setapiLoader(false) 
            dispatch(ACTIONS.updateProfileFriends(res.data.profile))
            new Audio(PostSound).play();
        }).catch(error => {
            setapiLoader(false) 
            console.log(error)
        })
    }




    return (
        <>
            <div className="col-md-3 col-sm-4 pe-2 ps-2">
                <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                    <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src={`${props.user.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${props.user.profile_photo}` : "assets/images/user.png"}`} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                        <div className="clearfix w-100"></div>
                        <h4 className="fw-700 font-xsss mt-3 mb-0">{props.user.name} </h4>
                        <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">{props.user.user_name}</p>
                        {/* <pre className='text-left'> {frindStatus}</pre> */}
                        {friStatus}
                        {apiLoader && (<button className="rounded  btn btn-sm btn-primary  text-white">Loading...</button>)}
                        {!apiLoader && (
                            <>
                                {friStatus == "request_sent" && (
                                    <button className="rounded btn btn-primary text-white"

                                        onClick={() => {
                                            unfriendFriendRequest(props.user._id)
                                        }}
                                    >Cencal Request</button>
                                )}
                                {friStatus == "request_recived" && (
                                    <div className='d-flex justify-content-between'>
                                        <button className="rounded  btn btn-sm btn-success  text-white"
                                            onClick={() => {
                                                acceptFriendRequest(props.user._id);
                                            }}
                                        >Accepte Request</button>
                                        <button className="rounded  btn btn-sm btn-primary  text-white"
                                            onClick={() => {
                                                unfriendFriendRequest(props.user._id)
                                            }}
                                        >Delete</button>
                                    </div>
                                )}
                                {friStatus == "Friend" && (
                                    <button className="rounded btn btn-warning text-white"
                                        onClick={() => {
                                            unfriendFriendRequest(props.user._id)
                                        }}
                                    >Unfriend</button>
                                )}
                                {friStatus == "" && (
                                    <button className="rounded btn btn-success text-white"
                                        onClick={() => {
                                            sendFrindRe(props.user._id);
                                        }}
                                    >Add Friend</button>
                                )}
                            </>
                        )}


                    </div>
                </div>
            </div>
        </>

    );
}

export default SendFriendRequest



