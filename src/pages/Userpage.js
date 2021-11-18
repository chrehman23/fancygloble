import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Profiledetail from '../components/Profiledetail';
import Profilephoto from '../components/Profilephoto';
import ProfilecardThree from '../components/ProfilecardThree';
import Createpost from '../components/Createpost';
import Events from '../components/Events';
import Postview from '../components/Postview';
import Load from '../components/Load';
import moment from 'moment'

import usreProfilePic from '../../public/assets/images/user.png'
import usreProfilePicbg from '../../public/assets/images/group.png'


import PostLists from '../components/PostLists'
import Comingsoon from "./Comingsoon.js";
class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileTabs: 1
        }
    }
    profielTabsChange = (tab) => {
        this.setState({ profileTabs: tab })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {
        return (
            <Fragment>

                <Header />
                <Leftnav />
                <Rightchat />

                {this.props.ProfileLoading && (
                    <>
                        <div className="main-content right-chat-active">
                            <div className="middle-sidebar-bottom">
                                <div className="middle-sidebar-left pe-0">
                                    <Load />
                                    {/* {JSON.stringify(this.props.Profile,null,2)} */}
                                </div>
                            </div>
                        </div>
                    </>)}

                {!this.props.ProfileLoading && (
                    <div className="main-content right-chat-active">
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left pe-0">
                                <div className="row">
                                    <div className="col-xl-12 mb-3">
                                        <ProfilecardThree
                                        buttons={false}
                                            profielTabsChange={this.profielTabsChange}
                                            profileTabs={this.state.profileTabs}
                                            Profile={this.props.Profile} />
                                    </div>
                                    {this.state.profileTabs == 1 && (
                                        <>
                                            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                                <Profiledetail about={this.props.Profile.about} />
                                                {/* <Profilephoto /> */}
                                                {/* <Events /> */}
                                            </div>
                                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                                <PostLists />
                                            </div>
                                        </>
                                    )}


                                    {this.state.profileTabs == 2 && (
                                        <>
                                            {this.props.Profile && this.props.Profile.followers.map((data, index) => {
                                                return (
                                                    <div key={index} className="col-md-6 col-sm-6 pe-2 ps-2">
                                                        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                                                            <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{ backgroundImage: `url("${data.user_id && data.user_id.profile_cover ? data.user_id.profile_cover : usreProfilePicbg}")` }}></div>
                                                            <div className="card-body d-block w-100  pt-0 text-left position-relative">
                                                                <div className='d-flex w-100'>
                                                                    <figure className="avatar imageControlermd " style={{ marginTop: `-40px` }}>
                                                                        <img src={data.user_id && data.user_id.profile_photo ? data.user_id.profile_photo : usreProfilePic} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " />
                                                                    </figure>
                                                                    <div className='ml-5'>
                                                                        <h4 className="fw-700 font-xsss mt-3 mb-1">{data.user_id && data.user_id.name}</h4>
                                                                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{data.user_id && data.user_id.user_name}</p>
                                                                    </div>
                                                                </div>

                                                                <span className="position-absolute right-15 top-0 d-flex align-items-center d-none">
                                                                    <a href="/defaultgroup" className="d-lg-block d-none"><i className="feather-video btn-round-md font-md bg-primary-gradiant text-white"></i></a>
                                                                    <a href="/defaultgroup" className="text-center d-none p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">FOLLOW</a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            {this.props.Profile && this.props.Profile.followers.length == 0 && (
                                                <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                                    <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                        <div className="stage">
                                                            No follower found.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                        </>
                                    )}
                                    {this.state.profileTabs == 3 && (
                                        <>
                                            {this.props.Profile && this.props.Profile.followings.map((data, index) => {
                                                return (
                                                    <div key={index} className="col-md-6 col-sm-6 pe-2 ps-2">
                                                        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                                                            <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{ backgroundImage: `url("${data.user_id && data.user_id.profile_cover ? data.user_id.profile_cover : usreProfilePicbg}")` }}></div>
                                                            <div className="card-body d-block w-100  pt-0 text-left position-relative">
                                                                <div className='d-flex w-100'>
                                                                    <figure className="avatar imageControlermd " style={{ marginTop: `-40px` }}>
                                                                        <img src={data.user_id && data.user_id.profile_photo ? data.user_id.profile_photo : usreProfilePic} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " />
                                                                    </figure>
                                                                    <div className='ml-5'>
                                                                        <h4 className="fw-700 font-xsss mt-3 mb-1">{data.user_id && data.user_id.name}</h4>
                                                                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{data.user_id && data.user_id.user_name}</p>
                                                                    </div>
                                                                </div>
                                                    
                                                                <span className="position-absolute right-15 top-0 d-flex align-items-center d-none">
                                                                    <a href="/defaultgroup" className="d-lg-block d-none"><i className="feather-video btn-round-md font-md bg-primary-gradiant text-white"></i></a>
                                                                    <a href="/defaultgroup" className="text-center d-none p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">FOLLOW</a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {this.props.Profile && this.props.Profile.followings.length == 0 && (
                                                <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                                    <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                        <div className="stage">
                                                            No followings found.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                        </>
                                    )}

                                    {this.state.profileTabs == 6 && (
                                        <>
                                            <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                                <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                    <div className="stage">
                                                       <Comingsoon/>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>


                )}

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Popupchat />
                <Appfooter />

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ProfileLoading: state.UserProfile.loading,
        Profile: state.UserProfile.profile,
        ProfileFriends: state.UserProfile.firends,
        Posts: state.Posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPosts: (data) => {
            dispatch(ACTIONS.addPosts(data))
        },
        createPost: (data) => {
            dispatch(ACTIONS.addPost(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Userpage))