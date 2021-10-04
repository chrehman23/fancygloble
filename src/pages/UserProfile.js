import React, { Component, Fragment } from "react";


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

import AuthApi from '../api/Auth';
import avatar from '../../public/assets/images/user.png';
import usreProfilePic from '../../public/assets/images/user.png'
import usreProfilePicbg from '../../public/assets/images/group.png'
import PostLists from '../components/PostLists'
class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            posts: [],
            loading: true,
            errorRecord: false,
            profileTabs: 1
        }
    }

    profielTabsChange = (tab) => {
        this.setState({ profileTabs: tab })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let { user_name } = this.props.match.params
        AuthApi.getUserProfileByUserName(user_name).then(res => {
            console.log(res.data)
            if (res.data.Error == false) {
                this.setState({
                    profile: res.data.profile,
                    posts: res.data.posts
                })
            }
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false,
                errorRecord: true,
            })
        })

    }


    render() {
        return (
            <Fragment>

                <Header />
                <Leftnav />
                <Rightchat />
                {this.state.errorRecord && (
                    <>
                        <div className="main-content right-chat-active">
                            <div className="middle-sidebar-bottom">
                                <div className="middle-sidebar-left pe-0">
                                    <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                        <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                            <div className="stage">
                                                No record found.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {this.state.loading && (
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

                {!this.state.loading && !this.state.errorRecord && (
                    <div className="main-content right-chat-active">
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left pe-0">
                                <div className="row">
                                    <div className="col-xl-12 mb-3">
                                        <ProfilecardThree
                                            profielTabsChange={this.profielTabsChange}
                                            profileTabs={this.state.profileTabs}
                                            Profile={this.state.profile} />
                                    </div>
                                    {this.state.profileTabs == 1 && (
                                        <>
                                            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                                <Profiledetail about={this.state.profile.about} />
                                                {/* <Profilephoto /> */}
                                                {/* <Events /> */}
                                            </div>
                                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                                {this.state.posts.map(data => {
                                                    return (
                                                        <Postview
                                                            modalPostView={this.modalPostView}
                                                            id={data._id}
                                                            key={data._id}
                                                            allData={data}
                                                            postvideo={data.url_status}
                                                            postimage={data.post_images}
                                                            avater={data.created_by && data.created_by.profile_photo ? `${data.created_by && data.created_by.profile_photo}` : avatar}
                                                            user={data.posted_by && data.posted_by.name}

                                                            time={moment(data.created_at).fromNow(true)}
                                                            des={data.description}
                                                            commentCount={data.comments_count}
                                                        // comments={data.comments}
                                                        />
                                                    )
                                                })}
                                                {this.state.posts.length == 0 && (
                                                    <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                                        <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                            <div className="stage">
                                                                No Post found.
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                        </>
                                    )}

                                    {this.state.profileTabs == 2 && (
                                        <>
                                            {this.state.profile && this.state.profile.followers.map((data, index) => {
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

                                            {this.state.profile && this.state.profile.followers.length==0 && (
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
                                            {this.state.profile && this.state.profile.followings.map((data, index) => {
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
                                            {this.state.profile && this.state.profile.followings.length == 0 && (
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
                                                        Coming soon.
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



export default Userpage