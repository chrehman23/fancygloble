import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js' 
import PostSound from '../../public/assets/sounds/post_sound.mp3'
import domiImage from '../../public/assets/images/user.png'
import UserApi from '../api/Users'

import UserProfile from '../../public/assets/images/user.png'

class Friends extends Component {

    constructor(props) {
        super();
        this.state = {
            apiLoader: false
        }
    }


    acceptFriendRequest = (id) => {
        this.setState({ apiLoader: true })
        let data = {
            user_id: id, 
        }
        UserApi.acceptFriendRequest(data).then(res => {
            console.log(res)
            this.setState({ apiLoader: false })
            this.props.updateProfileFriends(res.data.profile)
            new Audio(PostSound).play();
        }).catch(error => {
            this.setState({ apiLoader: false })
            console.log(error)
        })
    }
    unfriendFriendRequest = (id) => {
        this.setState({ apiLoader: true })
        let data = {
            user_id: id, 
        }
        UserApi.unfriendFriendRequest(data).then(res => {
            console.log(res)
            this.setState({ apiLoader: false })
            this.props.updateProfileFriends(res.data.profile)
            new Audio(PostSound).play();
        }).catch(error => {
            this.setState({ apiLoader: false })
            console.log(error)
        })
    }


    render() {
        return (
            <>
                {/* {JSON.stringify(this.props.followers)} */}
                {!this.props.Profileloading && this.props.followers && (
                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                        <div className="card-body d-flex align-items-center p-4">
                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Followers</h4>
                            {/* <a href="/defaultmember" className="fw-600 ms-auto font-xssss text-primary">See all</a> */}
                        </div>
                        {this.props.followers.map((value, index) => {
                            return (
                                <div className="wrap" key={index}>
                                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
                                        <figure className="avatar smImageControlerRs me-3"><img src={`${value.user_id && value.user_id.profile_photo ? `${value.user_id && value.user_id.profile_photo}` : domiImage}`} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                                        {/* <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.friend} mutual friends</span></h4> */}
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.user_id && value.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.user_id  && value.user_id.user_name}</span></h4>
                                    </div>
                                    <div className="card-body d-flex align-items-center d-none justify-content-between pt-0 ps-4 pe-4 pb-4">
                                        {this.state.apiLoader && ("Loading...")}
                                        {/* {value.user_id.name} */}
                                        {!this.state.apiLoader && (
                                            <>
                                                <button className="btn btn-primary text-white"
                                                onClick={()=>{
                                                    this.acceptFriendRequest(value.user_id._id)
                                                }}
                                                >Confirm</button>
                                                <button className="btn btn-secondary "
                                                    onClick={() => {
                                                        this.unfriendFriendRequest(value.user_id._id)
                                                    }}
                                                >Delete</button>

                                            </>
                                        )}
                                       </div>
                                </div>

                            )

                        })}
                    </div>
                )}
                {!this.props.Profileloading && this.props.followings && (
                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                        <div className="card-body d-flex align-items-center p-4">
                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Followings</h4>
                            {/* <a href="/defaultmember" className="fw-600 ms-auto font-xssss text-primary">See all</a> */}
                        </div>
                        {this.props.followings.map((value, index) => {
                            return (
                                <div className="wrap" key={index}>
                                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
                                        <figure className="avatar smImageControlerRs me-3"><img src={`${value.user_id && value.user_id.profile_photo ? `${value.user_id && value.user_id.profile_photo}` : UserProfile}`} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                                        {/* <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.friend} mutual friends</span></h4> */}
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.user_id && value.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.user_id && value.user_id.user_name}</span></h4>
                                    </div>
                                    <div className="card-body d-flex align-items-center d-none justify-content-between pt-0 ps-4 pe-4 pb-4">
                                        {this.state.apiLoader && ("Loading...")}
                                        {/* {value.user_id.name} */}
                                        {!this.state.apiLoader && (
                                            <>
                                                <button className="btn btn-primary text-white"
                                                onClick={()=>{
                                                    this.acceptFriendRequest(value.user_id._id)
                                                }}
                                                >Confirm</button>
                                                <button className="btn btn-secondary "
                                                    onClick={() => {
                                                        this.unfriendFriendRequest(value.user_id._id)
                                                    }}
                                                >Delete</button>

                                            </>
                                        )}
                                       </div>
                                </div>

                            )

                        })}
                    </div>
                )}

            </>

        );
    }
}

const mapStateToProps = (state) => { 
    // let friendsRequest = state.UserProfile.profile.friends && state.UserProfile.profile.friends.filter(data => data.status == "request_recived");
    return {
        followers: state.UserProfile.profile.followers,
        followings: state.UserProfile.profile.followings,
        Profileloading: state.UserProfile.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileFriends: (data) => {
            dispatch(ACTIONS.updateProfileFriends(data))
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Friends))
