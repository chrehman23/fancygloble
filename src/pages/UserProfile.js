import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js.js';
import PostSound from '../../public/assets/sounds/post_sound.mp3'
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
import { Modal } from 'react-bootstrap'
import AuthApi from '../api/Auth';
import avatar from '../../public/assets/images/user.png';
import usreProfilePic from '../../public/assets/images/user.png'
import usreProfilePicbg from '../../public/assets/images/group.png'
import PostLists from '../components/PostLists'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Comments from '../components/Comments';
class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            posts: [],
            loading: true,
            errorRecord: false,
            profileTabs: 1,
            PostViewModal: false,
            commentsCount: 0,
            comments: true,
        }
    }

    profielTabsChange = (tab) => {
        this.setState({ profileTabs: tab })
    }

    componentDidMount() {

        let token = localStorage.getItem("token")
        if (!token) {
            this.props.history.push("/login")
        }


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

    modalPostView = (post) => {
        console.log(post)
        this.setState({
            PostViewModal: true,
            postModalDetails: post
        })
    }

    updateComentsCount = () => {
        this.setState({ commentsCount: this.state.commentsCount + 1 })
    }



    purchasePost = (data) => {
        this.setState({
            post: data.paidPost
        })
        this.props.addPaidPost(data.paidPost)
        new Audio(PostSound).play();
        let notification = {
            name: data.paidPost.created_by.name,
            profile: data.paidPost.created_by.profile_photo,
            des: data.msg,
            time: new Date()
        }
        this.props.addnotificaions(notification)
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
                                    <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 shadow-xss rounded-xxl">
                                        <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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
                    <div className="main-content right-chat-active userProfile_container">
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left pe-0">
                                <div className="row feed-body">
                                    <div className="mb-3 col-xl-12">
                                        <ProfilecardThree
                                            profielTabsChange={this.profielTabsChange}
                                            profileTabs={this.state.profileTabs}
                                            Profile={this.state.profile} />
                                    </div>
                                    {this.state.profileTabs == 1 && (
                                        <>
                                            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                                <Profiledetail profile_id={this.state.profile && this.state.profile._id} about={this.state.profile.about} />
                                                {/* <Profilephoto /> */}
                                                {/* <Events /> */}
                                            </div>
                                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                                {this.state.posts.map(data => {
                                                    return (
                                                        <Postview
                                                            purchasePost={this.purchasePost}
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
                                                    <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 shadow-xss rounded-xxl">
                                                        <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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
                                                    <div key={index} className="col-md-6 col-sm-6 pe-2 ps-2" >
                                                        <div className="mt-2 mb-0 overflow-hidden border-0 cursor-pointer card d-block shadow-xss rounded-3"
                                                            onClick={() => {
                                                                this.props.history.push(`/user/${data.user_id && data.user_id.user_name}`)
                                                                window.location.reload();
                                                            }}
                                                        >
                                                            <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{ backgroundImage: `url("${data.user_id && data.user_id.profile_cover ? data.user_id.profile_cover : usreProfilePicbg}")` }}></div>
                                                            <div className="pt-0 text-left card-body d-block w-100 position-relative">
                                                                <div className='d-flex w-100'>
                                                                    <figure className="avatar imageControlermd " style={{ marginTop: `-40px` }}>
                                                                        <img src={data.user_id && data.user_id.profile_photo ? data.user_id.profile_photo : usreProfilePic} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " />
                                                                    </figure>
                                                                    <div className='ml-5'>
                                                                        <h4 className="mt-3 mb-1 fw-700 font-xsss">{data.user_id && data.user_id.name}</h4>
                                                                        <p className="mt-0 mb-3 fw-500 font-xsssss text-grey-500 lh-3">{data.user_id && data.user_id.user_name}</p>
                                                                    </div>
                                                                </div>

                                                                <span className="top-0 position-absolute right-15 d-flex align-items-center d-none">
                                                                    <a href="/defaultgroup" className="d-lg-block d-none"><i className="text-white feather-video btn-round-md font-md bg-primary-gradiant"></i></a>
                                                                    <a href="/defaultgroup" className="p-2 text-center text-white bg-current d-none lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl font-xsssss fw-700 ls-lg">FOLLOW</a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })}

                                            {this.state.profile && this.state.profile.followers.length == 0 && (
                                                <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 shadow-xss rounded-xxl">
                                                    <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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
                                                        <div className="mt-2 mb-0 overflow-hidden border-0 cursor-pointer card d-block shadow-xss rounded-3"
                                                            onClick={() => {
                                                                this.props.history.push(`/user/${data.user_id && data.user_id.user_name}`)
                                                                window.location.reload();
                                                            }}
                                                        >
                                                            <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{ backgroundImage: `url("${data.user_id && data.user_id.profile_cover ? data.user_id.profile_cover : usreProfilePicbg}")` }}></div>
                                                            <div className="pt-0 text-left card-body d-block w-100 position-relative">
                                                                <div className='d-flex w-100'>
                                                                    <figure className="avatar imageControlermd " style={{ marginTop: `-40px` }}>
                                                                        <img src={data.user_id && data.user_id.profile_photo ? data.user_id.profile_photo : usreProfilePic} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " />
                                                                    </figure>
                                                                    <div className='ml-5'>
                                                                        <h4 className="mt-3 mb-1 fw-700 font-xsss">{data.user_id && data.user_id.name}</h4>
                                                                        <p className="mt-0 mb-3 fw-500 font-xsssss text-grey-500 lh-3">{data.user_id && data.user_id.user_name}</p>
                                                                    </div>
                                                                </div>

                                                                <span className="top-0 position-absolute right-15 d-flex align-items-center d-none">
                                                                    <a href="/defaultgroup" className="d-lg-block d-none"><i className="text-white feather-video btn-round-md font-md bg-primary-gradiant"></i></a>
                                                                    <a href="/defaultgroup" className="p-2 text-center text-white bg-current d-none lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl font-xsssss fw-700 ls-lg">FOLLOW</a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {this.state.profile && this.state.profile.followings.length == 0 && (
                                                <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 shadow-xss rounded-xxl">
                                                    <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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
                                            <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 shadow-xss rounded-xxl">
                                                <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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

               

                <Popupchat />
                <Appfooter />


                {/* post View Modal  */}
                <Modal
                    show={this.state.PostViewModal}
                    size='xl'
                    scrollable={true}
                    scrollable={true}
                    onHide={() => this.setState({ PostViewModal: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        {this.state.PostViewModal && (
                            <div className='postModalHeader'>
                                <div>
                                    <div><img src={this.state.postModalDetails && this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.profile_photo} alt='Image' /></div>
                                    <div>
                                        <h4>{this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.name}</h4>
                                        <small>{this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.user_name}</small>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-grey-500'>{moment(this.state.postModalDetails && this.state.postModalDetails.created_at).fromNow(true)} ago</p>
                                </div>
                            </div>
                        )}


                    </Modal.Header>
                    <Modal.Body>
                        {this.state.PostViewModal && (
                            <div className='postmodalContainer'>
                                {/* {JSON.stringify(this.state.postModalDetails)} */}
                                <div className='row'>
                                    <div className='col-lg-8'>
                                        {this.state.postModalDetails && this.state.postModalDetails.image_status && (
                                            <div className='postModalSlider'>
                                                <Carousel
                                                    autoPlay={false}
                                                >
                                                    {this.state.postModalDetails.post_images.map((data, index) => {
                                                        return (
                                                            <div>
                                                                <img src={`${data.picture}`} />
                                                            </div>
                                                        )
                                                    })}

                                                </Carousel>
                                            </div>

                                        )}
                                    </div>
                                    <div className='col-lg-4'>
                                        <p><b>Comments({this.state.postModalDetails && this.state.postModalDetails.comments_count + this.state.commentsCount})</b></p>
                                        {this.state.comments && (
                                            <Comments
                                                _id={this.state.postModalDetails._id}
                                                // comments={this.props.comments}
                                                updateComentsCount={this.updateComentsCount}
                                            />
                                        )}
                                        {/* {this.state.Emojis && (
                                 <Emojis _id={this.state.postModalDetails._id} />
                              )} */}
                                    </div>
                                </div>
                            </div>

                        )}
                    </Modal.Body>
                </Modal>
                {/* ******************************************* */}

            </Fragment>
        );
    }
}




 


const mapStateToProps = (state) => {
    return {
        // Posts: state.Posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPaidPost: (data) => {
            dispatch(ACTIONS.addPaidPost(data))
        },
        addnotificaions: (data) => {
            dispatch(ACTIONS.addnotificaion(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Userpage))